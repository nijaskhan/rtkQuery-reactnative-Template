import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import {scaleFont, scaleSize, showToast} from '../../utils';
import NormalText from '../Text/NormalText';
import {FontSize} from '../../constants/Fonts';
import Icon from '../Icon';
import HStack from '../HStack';
import moment from 'moment';
import CButton from '../CButton';
import Divider from '../Divider';
import {
  bookingSelector,
  clearBookingState,
  getBookingAttachments,
  getBookings,
  postBookingAttachments,
} from '../../features/Booking/BookingSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {userSelector} from '../../features/Auth/AuthSlice';
import {useEffect} from 'react';
import Center from '../Center';
import InvoiceItem from '../Card/InvoiceItem';
import {BOOKING_FILE_URL} from '../../utils/apiutils';
import DocumentPicker from 'react-native-document-picker';
import {useListBookingsAttachmentQuery} from '../../rtk/api/bookingApi';

const EventModal = ({isModalVisible, toggleModal, item}) => {
  const [files, setFiles] = useState(null);
  const {userId, userAgencyDomain} = useSelector(userSelector);
  const [bookingAttachments, setBookingAttachments] = useState([]);
  const dispatch = useDispatch();
  const [uploadClicked, setUploadClicked] = useState(false);

  const {
    // bookingFiles,
    isBookingFilesFetching,
    isBookingFilesSuccess,
    isBookingFilesError,
    bookingFileErrorMessage,
    isPostBookingFilesFetching,
    isPostBookingFilesError,
    isPostBookingFilesSuccess,
    postBookingFileErrorMessage,
  } = useSelector(bookingSelector);

  const {data, isSuccess, isError, isFetching, error, isLoading, refetch} =
    useListBookingsAttachmentQuery({
      baseUrl: userAgencyDomain,
      mbf_mb_id: item?.eventId,
      mod_id: userId,
    });

  useFocusEffect(
    useCallback(() => {
      // loadData();
      return () => {
        dispatch(clearBookingState());
        setBookingAttachments([]);
      };
    }, [item]),
  );

  const loadData = () => {
    dispatch(clearBookingState());
    dispatch(getBookingAttachments({mbf_mb_id: item?.eventId, mod_id: userId}));
  };

  useEffect(() => {
    if (data) {
      setBookingAttachments(data.data);
      // dispatch(clearBookingState());
    }
  }, [data]);

  useEffect(() => {
    if (isPostBookingFilesSuccess) {
      setUploadClicked(false);
      loadData();
    }
  }, [isPostBookingFilesSuccess]);

  useEffect(() => {
    if (isPostBookingFilesError) {
      showToast('Uploading Failed', postBookingFileErrorMessage, 'error');
      setUploadClicked(false);
    }
  }, [isPostBookingFilesError]);

  useEffect(() => {
    if (files != null) {
      // uploadFile(files);
    }
  }, [files]);

  const handleUpload = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setFiles(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  // —-------- error handler —------------
  const handleError = e => {
    if (DocumentPicker.isCancel(e)) {
      Alert.alert('Upload Cancelled');
    } else {
      Alert.alert('Unknown Error: ' + JSON.stringify(e));
    }
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View
        style={{
          backgroundColor: Colors.white,
          marginVertical: scaleSize(50),
          borderRadius: scaleSize(5),
          padding: scaleSize(15),
        }}>
        <NormalText
          fontSize={FontSize.regularVariant}
          colorLight={Colors.textDark}
          fontWeight={600}
          props={{marginBottom: scaleSize(15)}}
          text={item?.eventTitle}
        />
        <NormalText
          fontSize={FontSize.smallVariant}
          colorLight={Colors.textDark}
          fontWeight={500}
          props={{marginBottom: scaleSize(8)}}
          text={item?.eventDesc == '' ? 'No Description' : item?.eventDesc}
        />
        <HStack alignItems={'center'} justifyContent="flex-start">
          <Icon
            name="calendar-outline"
            size={scaleFont(12)}
            color={Colors.textDefault}
          />
          <NormalText
            text={item?.eventStartDate}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={500}
            noOfLines={1}
            props={{marginLeft: scaleSize(5)}}
          />
          <NormalText
            text={' - ' + item?.eventEndDate}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={500}
            noOfLines={1}
          />
        </HStack>
        <HStack
          mt={scaleSize(8)}
          alignItems={'center'}
          justifyContent="flex-start">
          <Icon name="clock" size={scaleFont(12)} color={Colors.textDefault} />
          <NormalText
            text={moment(item?.startTime, 'hh:mm:ss').format('hh:mm')}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={500}
            noOfLines={1}
            props={{marginLeft: scaleSize(5)}}
          />
          <NormalText
            text={` - ${moment(item?.endTime, 'hh:mm:ss').format('hh:mm')}`}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={500}
            noOfLines={1}
          />
        </HStack>
        <HStack
          alignItems={'center'}
          justifyContent="flex-start"
          mt={scaleSize(8)}>
          <Icon name="map" size={scaleFont(12)} color={Colors.textDefault} />
          <NormalText
            text={item?.eventVenue == '' ? 'No venue added' : item?.eventVenue}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={500}
            noOfLines={1}
            props={{marginLeft: scaleSize(5)}}
          />
        </HStack>
        {item.eventBlocked == 'N' ? (
          <View>
            <HStack mt={scaleSize(12)} justifyContent="flex-start">
              <CButton
                onPress={() => onAcceptClick()}
                h={scaleSize(30)}
                mr={scaleSize(8)}
                bgColor={Colors.acceptColor}
                isLoading={false}
                isLoadingText="Please wait.."
                iconName="tick"
                iconSize={scaleFont(10)}
                iconColor={Colors.white}
                text={'Accept'}
                textColor={Colors.white}
                fontSize={FontSize.xs}
                isDisabled={false}
                px={scaleSize(10)}
              />
              <CButton
                onPress={() => onCancelClick()}
                h={scaleSize(30)}
                bgColor={Colors.error}
                isLoading={false}
                isLoadingText="Please wait.."
                iconName="cross"
                iconSize={scaleFont(10)}
                iconColor={Colors.white}
                text={'Cancel'}
                textColor={Colors.white}
                fontSize={FontSize.xs}
                px={scaleSize(10)}
              />
            </HStack>
            <Divider
              style={{marginTop: scaleSize(15), marginBottom: scaleSize(15)}}
            />
            <NormalText
              text={'Add Attachments'}
              fontSize={FontSize.regular}
              fontWeight={500}
              colorLight={Colors.textPrimary}
            />
            <HStack mt={scaleSize(10)}>
              <TouchableOpacity
                style={{flex: 1}}
                activeOpacity={7}
                onPress={() => {
                  handleUpload();
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: scaleSize(4),
                    paddingVertical: scaleSize(8),
                    borderRadius: scaleSize(5),
                    borderColor: Colors.textMutedVariant,
                    borderWidth: 1,
                  }}>
                  <NormalText
                    colorLight={Colors.textMutedVariant}
                    fontSize={FontSize.smallVariant}
                    text={'Choose File'}
                    fontWeight={400}
                  />
                </View>
              </TouchableOpacity>
              <CButton
                ml={scaleSize(10)}
                iconName=""
                px={scaleSize(10)}
                h={scaleSize(30)}
                size="xs"
                onPress={() => {
                  console.log('click');
                }}
                text={'Add'}></CButton>
            </HStack>
            <View
              style={{
                height: scaleSize(300),
              }}>
              {bookingAttachments.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    paddingTop: scaleSize(20),
                    paddingBottom: scaleSize(20),
                  }}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  data={bookingAttachments}
                  scrollEventThrottle={16}
                  renderItem={({item, index}) => (
                    <InvoiceItem
                      key={item.mbf_id}
                      item={item}
                      image={item.mbf_file.replace(
                        'https://s3-ap-southeast-1.amazonaws.com/staragent-userfiles/demo/models/files/',
                        BOOKING_FILE_URL,
                      )}
                      index={index}
                    />
                  )}
                  keyExtractor={item => item.id}
                  nestedScrollEnabled
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          width: scaleFont(11),
                          height: scaleFont(11),
                        }}
                      />
                    );
                  }}
                />
              ) : (
                <Center>
                  <NormalText
                    text={'No Records'}
                    fontSize={FontSize.smallVariant}
                    colorLight={Colors.textMutedVariant}
                    fontWeight={400}
                  />
                </Center>
              )}
            </View>
          </View>
        ) : (
          <HStack mt={scaleSize(8)} justifyContent="flex-start">
            <CButton
              // onPress={() => onCancelClick()}
              h={scaleSize(30)}
              bgColor={Colors.error}
              isLoading={false}
              isLoadingText="Please wait.."
              iconName="cross"
              iconSize={scaleFont(10)}
              iconColor={Colors.white}
              text={'Delete'}
              textColor={Colors.white}
              fontSize={FontSize.xs}
              px={scaleSize(10)}
              mt={scaleSize(12)}
            />
          </HStack>
        )}
      </View>
    </Modal>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
