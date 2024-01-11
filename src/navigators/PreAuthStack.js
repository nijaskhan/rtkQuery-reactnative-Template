import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from 'navigators';
import Login from 'screens/login';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const PreAuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.LOGIN}
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
    </Stack.Navigator>
    // <Drawer.Navigator initialRouteName="Home">
    //   <Drawer.Screen
    //     name="Home"
    //     component={Login}
    //     options={{title: 'Login', headerShown: false}}
    //   />
    // </Drawer.Navigator>
  );
};

export default PreAuthStack;
