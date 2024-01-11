import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Center = ({children, bg = Colors.white, h = '100%', style}) => {
  return (
    <View
      style={[styles.centerContainer, {backgroundColor: bg, height: h}, style]}>
      {children}
    </View>
  );
};

export default Center;

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
