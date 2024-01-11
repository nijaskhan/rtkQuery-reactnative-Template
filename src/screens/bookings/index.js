import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import InnerHeader from '../../components/Header/innerHeader';
import {HeaderHeight} from '../../styles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Colors from '../../constants/Colors';
import {userSelector, clearBookingClick} from '../../features/Auth/AuthSlice';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import BookingItem from '../../components/Card/BookingItem';
import EmptyElement from '../../components/Empty';
import {scaleSize, showToast} from '../../utils';
import {FloatingAction} from 'react-native-floating-action';
import EventModal from '../../components/EventModal';
import {useListBookingsQuery} from '../../rtk/api/bookingApi';

const Bookings = () => {
  const vacation = {key: 'vacation', color: 'red'};
  const massage = {key: 'massage', color: Colors.acceptColor};
  const workout = {key: 'workout', color: 'green'};

  const dispatch = useDispatch();
  const {userId, userAgencyDomain} = useSelector(userSelector);
  const [bookingData, setBookingData] = useState({});
  const [pageNo, setPageNo] = useState(0);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedEventItem, setSelectedEventItem] = useState({});

  const {data, isSuccess, isError, isFetching, error, isLoading, refetch} =
    useListBookingsQuery({
      baseUrl: userAgencyDomain,
      modelid: userId,
      pageno: pageNo,
    });

  const loadData = () => {
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(clearBookingClick());
      return () => {
        setSelectedEvent([]);
      };
    }, []),
  );

  useEffect(() => {
    if (data) {
      setBookingData(data);
    }
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    if (Object.keys(selectedEventItem).length !== 0) {
      setShowEventModal(true);
    }
  }, [selectedEventItem]);

  const handleDateClick = date => {
    if (bookingData.hasOwnProperty(date)) {
      setSelectedEvent(bookingData[date].data);
    } else {
      setSelectedEvent([]);
    }
  };

  const hideModal = () => {
    setShowEventModal(false);
    setSelectedEventItem({});
  };

  return (
    <Container statusBar={true} paddingBottom={false}>
      <View style={{flex: 1, marginBottom: scaleSize(50)}}>
        <View style={{height: HeaderHeight}}>
          <InnerHeader title={'Bookings'} />
        </View>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Calendar
            // markingType={'multi-dot'}
            onDayPress={day => {
              handleDateClick(day.dateString);
            }}
            markedDates={bookingData}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: scaleSize(15),
              marginTop: scaleSize(10),
            }}>
            {selectedEvent.length > 0 ? (
              selectedEvent.map((item, index) => (
                <BookingItem
                  index={index}
                  item={item}
                  key={'bookings_' + index}
                  onPress={() => setSelectedEventItem(item)}
                />
              ))
            ) : (
              <View style={{height: 200}}>
                <EmptyElement page={'booking'} />
              </View>
            )}
          </View>
        </ScrollView>
        <FloatingAction
        // onPressMain={() =}
        />
      </View>
      <EventModal
        isModalVisible={showEventModal}
        toggleModal={() => hideModal()}
        item={selectedEventItem}
      />
    </Container>
  );
};

export default Bookings;

const styles = StyleSheet.create({});
