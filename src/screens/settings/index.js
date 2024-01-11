import {
  Alert,
  Appearance,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from 'components/Container';
import {Animated} from 'react-native';
import {Platform} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DEFAULT_IMAGE, isIOS, scaleFont, scaleSize} from 'utils/index';
import moment from 'moment';
import MotiContainer from 'components/MotiContainer';
import {FontSize} from 'constants/Fonts';
import {SharedElement} from 'react-navigation-shared-element';
import InnerHeader from 'components/Header/innerHeader';
import {userSelector} from 'features/Auth/AuthSlice';
import {
  clearProfileState,
  getProfile,
  profileSelector,
} from 'features/Profile/ProfileSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CImage from '../../components/CImage';
import InputFields from '../../components/Inputs/InputFields';
import {WINDOW_WIDTH} from '../../utils';
import Colors from '../../constants/Colors';

const Settings = ({navigation, route}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [oName, setOName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPic, setSelectedPic] = useState(DEFAULT_IMAGE);
  const [isGranted, setGranted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profileInfo, setProfileInfo] = useState(null);
  const colorMode = Appearance.getColorScheme();
  const {data} = route.params;

  const {userName, userEmail, userId} = useSelector(userSelector);
  const {
    isProfileFetching,
    isProfileSuccess,
    isProfileError,
    profileErrorMessage,
    userData,
  } = useSelector(profileSelector);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearProfileState());
      dispatch(getProfile({userid: userId}));
      return () => {
        dispatch(clearProfileState());
      };
    }, []),
  );

  useEffect(() => {
    if (isProfileSuccess) {
      setSelectedPic(userData.userProfileImage);
      setProfileInfo(userData);
      setTimeout(() => {
        setIsToggled(true);
      }, 200);
    }
  }, [isProfileSuccess]);

  const renderLabelSkelton = () => {
    return isProfileFetching ? (
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            alignItems: 'flex-start',
            backgroundColor: Colors.black,
          }}>
          <View
            style={{
              height: scaleSize(10),
              borderRadius: scaleSize(5),
              width: scaleSize(100),
              marginTop: scaleSize(10),
            }}
          />
          <View
            style={{
              height: scaleSize(10),
              borderRadius: scaleSize(5),
              width: scaleSize(200),
              marginTop: scaleSize(15),
              marginBottom: scaleSize(30),
            }}
          />
        </View>
      </SkeletonPlaceholder>
    ) : null;
  };

  return (
    <>
      <Container statusBar={false} paddingBottom={false}>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              overflow: 'hidden',
              backgroundColor: Colors.white,
            }}>
            <SharedElement id={data.id}>
              <InnerHeader title={data.title} />
            </SharedElement>
          </View>
          <Animated.View style={{opacity: fadeAnim, flex: 1}}>
            <KeyboardAvoidingView
              keyboardShouldPersistTaps="always"
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={{
                alignItems: 'center',
                marginBottom:
                  Platform.OS == 'ios' ? scaleSize(250) : scaleSize(80),
              }}>
              <View
                style={{
                  width: '90%',
                  marginTop: scaleSize(20),
                }}>
                <MotiContainer isToggled={isToggled} delay={400}>
                  <Pressable
                    style={{marginBottom: scaleSize(40), alignItems: 'center'}}>
                    <CImage
                      image={selectedPic}
                      w={scaleFont(100)}
                      h={scaleFont(100)}
                      borderRadius={scaleFont(50)}></CImage>
                  </Pressable>
                </MotiContainer>
                {renderLabelSkelton()}
                {isProfileSuccess ? (
                  <MotiContainer isToggled={isToggled} delay={200}>
                    <InputFields
                      isInvalid={false}
                      label={'Name'}
                      placeHolder={''}
                      iconName={''}
                      value={profileInfo?.userName}
                      setValue={val => setFName(val)}
                      error={'First Name cannot be blank.'}
                      isReadOnly={true}
                      isMandatory={false}
                      style={{marginBottom: scaleSize(30)}}
                    />
                  </MotiContainer>
                ) : null}
                {renderLabelSkelton()}
                {isProfileSuccess ? (
                  <MotiContainer isToggled={isToggled} delay={300}>
                    <InputFields
                      isInvalid={false}
                      label={'Email ID'}
                      placeHolder={''}
                      iconName={''}
                      value={profileInfo?.userEmail}
                      setValue={val => setLName(val)}
                      isReadOnly={true}
                      isMandatory={false}
                      style={{marginBottom: scaleSize(30)}}
                    />
                  </MotiContainer>
                ) : null}
                {renderLabelSkelton()}
                {isProfileSuccess ? (
                  <MotiContainer isToggled={isToggled} delay={400}>
                    <Pressable>
                      <InputFields
                        isInvalid={false}
                        label={'Mobile Number'}
                        placeHolder={''}
                        iconName={''}
                        value={profileInfo?.userPhone}
                        setValue={val => setOName(val)}
                        isMandatory={false}
                        isReadOnly={true}
                        style={{marginBottom: scaleSize(30)}}
                      />
                    </Pressable>
                  </MotiContainer>
                ) : null}
                {renderLabelSkelton()}
                {isProfileSuccess ? (
                  <MotiContainer isToggled={isToggled} delay={500}>
                    <Pressable>
                      <InputFields
                        isInvalid={false}
                        label={'Address'}
                        placeHolder={''}
                        iconName={''}
                        value={profileInfo?.userAddress}
                        setValue={val => setOName(val)}
                        error={'.'}
                        isReadOnly={true}
                        isMandatory={false}
                      />
                    </Pressable>
                  </MotiContainer>
                ) : null}
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Container>
    </>
  );
};

Settings.sharedElements = route => {
  const {data} = route.params;
  return [
    {
      id: data.image,
      animation: 'move',
      resize: 'auto',
      align: 'center',
    },
    {
      id: 'header',
      animation: 'fade',
      resize: 'auto',
      align: 'center-top',
    },
    {
      id: data.id,
      animation: 'fade',
      resize: 'auto',
    },
  ];
};

export default Settings;

const styles = colorMode =>
  StyleSheet.create({
    iosPickerContainerStyle: {
      backgroundColor:
        colorMode == 'light' ? Colors.btnPrimaryFeedbackBg : Colors.darkModeBg,
    },
  });
