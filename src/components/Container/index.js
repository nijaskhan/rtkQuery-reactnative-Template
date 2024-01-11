import {
  Appearance,
  Platform,
  SafeAreaView,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import StatusBar_ from '../StatusBar';
import {HeaderHeight} from '../../constants/Layout';
import {useSelector} from 'react-redux';
import {userSelector} from '../../features/Auth/AuthSlice';

export default function Container({children, paddingBottom = true, statusBar}) {
  const insets = useSafeAreaInsets();
  const insetsBottom = Platform.OS == 'ios' ? 0 : insets.bottom;
  const colorMode = Appearance.getColorScheme();
  const bg = useColorScheme(Colors.white, Colors.backgroundColor);
  const {colorScheme} = useSelector(userSelector);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: paddingBottom ? HeaderHeight + insetsBottom : 0,
      }}>
      {statusBar ? (
        <StatusBar_
          backgroundColor={
            colorScheme == 'light' ? Colors.white : Colors.darkModeBg
          }
          barStyle={colorScheme == 'light' ? 'dark-content' : 'light-content'}
        />
      ) : null}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            colorScheme == 'light' ? Colors.white : Colors.backgroundColor,
        }}>
        {children}
      </SafeAreaView>
    </View>
  );
}
