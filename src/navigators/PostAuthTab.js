import {View, Text, Animated, Dimensions} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screens from '.';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {userSelector} from '../features/Auth/AuthSlice';
import HomeNav from '../screens/home/homeNav';
import Colors from '../constants/Colors';
import {isIOS, lists} from '../utils';
import BottomNavigator from '../components/Footer/BottomNavigator';
import Settings from '../screens/settings';
import Bookings from '../screens/bookings';
import Jobs from '../screens/job';

export default function PostAuthTab(props) {
  const Tab = createBottomTabNavigator();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const {isJobClick, isBookingClick} = useSelector(userSelector);

  function getWidth() {
    let width = Dimensions.get('window').width;
    return width / 4;
  }

  const onJobClick = () => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth(),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isJobClick) {
      onJobClick();
    }
  }, [isJobClick]);

  const onBookingClick = () => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * 2,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isBookingClick) {
      onBookingClick();
    }
  }, [isBookingClick]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBar={props => <BottomNavigator {...props} />}
        backBehavior="initialRoute"
        swipeEnabled={true}
        headerShown={false}>
        <Tab.Screen
          name={Screens.HOME_NAV}
          component={HomeNav}
          options={{
            headerShown: false,
            //  tabBarStyle: {display: 'none'}
          }}
          listeners={(navigation, route) => ({
            state: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={Screens.JOBS}
          component={Jobs}
          initialParams={{data: lists[2]}}
          options={{
            headerShown: false,
            // tabBarStyle: {display: 'none'}
          }}
          listeners={(navigation, route) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={Screens.BOOKINGS}
          component={Bookings}
          initialParams={{data: lists[1]}}
          options={{
            headerShown: false,
            // tabBarStyle: {display: 'none'}
          }}
          listeners={(navigation, route) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={Screens.SETTINGS}
          component={Settings}
          initialParams={{data: lists[0]}}
          options={{
            headerShown: false,
            // tabBarStyle: {display: 'none'}
          }}
          listeners={(navigation, route) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() / 2,
          height: 4,
          backgroundColor: Colors.primaryColor,
          position: 'absolute',
          bottom: isIOS ? 85 : 60,
          left: getWidth() / 4,
          borderRadius: 10,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </View>
  );
}
