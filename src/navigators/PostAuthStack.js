import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Screens from '.';
import PostAuthTab from './PostAuthTab';

const Stack = createSharedElementStackNavigator();

const PostAuthStack = () => {
  const options = {
    headerBackTitleVisible: false,
    gestureEnabled: false,
    // transitionSpec: {
    //   open: {animation: 'timing', config: {duration: 400}},
    //   close: {animation: 'timing', config: {duration: 400}},
    // },
    // cardStyleInterpolator: ({current: {progress}}) => {
    //   return {
    //     cardStyle: {
    //       opacity: progress,
    //     },
    //   };
    // },
  };
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="PostAuthTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.POST_AUTH_TAB} component={PostAuthTab} />
    </Stack.Navigator>
  );
};

export default PostAuthStack;
