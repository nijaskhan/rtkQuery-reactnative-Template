import React from 'react';
import {Platform, StatusBar, View} from 'react-native';

export default function StatusBar_({
  hidden = false,
  translucent = false,
  barStyle = 'light-content',
  backgroundColor = 'white',
}) {
  return (
    // <View style={{backgroundColor: '#772ea2', height: StatusBarHeight}}>
    <StatusBar
      hidden={hidden}
      backgroundColor={backgroundColor}
      translucent={translucent}
      barStyle={barStyle}
    />
    // </View>
  );
}
