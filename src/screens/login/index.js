import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import Center from '../../components/Center';
import NormalText from '../../components/Text/NormalText';
import {FontSize} from '../../constants/Fonts';
import InputFields from '../../components/Inputs/InputFields';
import {
  WINDOW_HEIGHT,
  isIOS,
  scaleFont,
  scaleSize,
  showToast,
  validateEmail,
} from '../../utils';
import Divider from '../../components/Divider';
import {Dropdown} from '../../components/Dropdown';
import SingleDropDown from '../../components/SingleDropDown';
import MultiDropDown from '../../components/MultiDropDown';
import CButton from '../../components/CButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import CImage from '../../components/CImage';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {Spacing} from '../../constants/Layout';
import Colors from '../../constants/Colors';
import {
  clearState,
  loginUser,
  setUser,
  userSelector,
} from '../../features/Auth/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const {isLoginSuccess, isLoginError, isLoginFetching} =
    useSelector(userSelector);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearState());
      return () => {
        dispatch(clearState());
      };
    }, []),
  );

  useEffect(() => {
    if (isLoginSuccess) {
      showToast('Success', 'Welcome back to Staragent', 'success');
      dispatch(clearState());
      // navigation.navigate(Screens.USER_ACCOUNT);
      dispatch(setUser());
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      showToast('Failed', 'Check the login credentials', 'error');
      dispatch(clearState());
    }
  }, [isLoginError]);

  const onSubmit = () => {
    setUsernameError(false);
    setPasswordError(false);
    if (!validateInputs()) {
      return;
    }
    dispatch(
      loginUser({
        email: username,
        password: password,
        deviceId: 'dfsfdfsdfsdf',
      }),
    );
    // navigation.navigate(Screens.USER_ACCOUNT);
  };

  const validateInputs = () => {
    if (!validateEmail(username)) {
      setUsernameError(true);
      return false;
    }
    if (password.length <= 4) {
      setPasswordError(true);
      return false;
    }

    return true;
  };

  return (
    <Container statusBar={false} paddingBottom={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
        scrollEventThrottle={16}
        style={{flex: 1}}
        behavior={isIOS ? 'padding' : 'height'}>
        <Center>
          <View style={[styles.container]}>
            <NormalText
              text={'Login'}
              fontSize={FontSize.largeVariantXs}
              colorLight={Colors.black}
              fontWeight={600}
            />
            <InputFields
              isInvalid={usernameError}
              label={'Username'}
              placeHolder={''}
              value={username}
              setValue={val => setUsername(val)}
              error={'Email is not valid'}
              style={{marginTop: scaleSize(60)}}
              labelSize={scaleFont(14)}
              labelFontWeight={300}
              labelColor={Colors.black}
              iconName="username"
              iconColor={Colors.black}
              keyboardType="email-address"
            />
            <InputFields
              isInvalid={passwordError}
              label={'Password'}
              placeHolder={''}
              value={password}
              setValue={val => setPassword(val)}
              error={'Password is not valid'}
              style={{marginTop: scaleSize(30)}}
              labelSize={scaleFont(14)}
              labelFontWeight={300}
              labelColor={Colors.black}
              iconName="password"
              iconColor={Colors.black}
            />
            <CButton
              text={'Continue'}
              isLoading={isLoginFetching}
              onPress={() => onSubmit()}
              mt={scaleSize(60)}
              isDisabled={isLoginFetching}
              bgColor={Colors.primaryColor}
              iconName=""
            />
            <NormalText
              text={'Forgot Password?'}
              fontSize={FontSize.smallVariantPlus}
              colorLight={Colors.link}
              letterSpacing={0}
              fontWeight={400}
              styles={{textAlign: 'center', marginTop: Spacing.large}}
            />
          </View>
        </Center>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    paddingTop: WINDOW_HEIGHT * 0.2,
  },
});
