import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Home from '.';
import Screens from '../../navigators';

const HomeStack = createSharedElementStackNavigator();
const options = {
  headerShown: false,
  headerBackTitleVisible: false,
  gestureEnabled: false,
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 400}},
    close: {animation: 'timing', config: {duration: 400}},
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const HomeNav = () => {
  return (
    <HomeStack.Navigator headerShown={false}>
      <HomeStack.Screen
        name={Screens.HOME}
        component={Home}
        options={() => options}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNav;
