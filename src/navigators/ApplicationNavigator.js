import React, {useCallback, useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PreAuthStack from './PreAuthStack';
import {Animated, AppState, Appearance, Dimensions, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from 'reduxStore/index';
import {userSelector} from '../features/Auth/AuthSlice';
import PostAuthStack from './PostAuthStack';
import {clearJobData} from '../features/Jobs/JobSlice';

const ApplicationNavigator = () => {
  const dispatch = useDispatch();
  const colorMode = Appearance.getColorScheme();
  const {isIntroShown, isUserExist, isDrawerOpen} = useSelector(userSelector);

  const {width, height} = Dimensions.get('screen');
  const fromCoords = {x: 0, y: height};
  const toCoords = {x: width, y: 0};

  const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const animate = toValue => {
    return Animated.spring(animation, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      useNativeDriver: true,
      bounciness: 2,
      speed: 10,
    });
  };

  // useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     if (nextAppState === 'background' || nextAppState === 'inactive') {
  //       dispatch(clearJobData());
  //     }
  //   };
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={colorMode == 'light' ? DefaultTheme : DarkTheme}>
        {isUserExist ? <PostAuthStack /> : <PreAuthStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default ApplicationNavigator;
