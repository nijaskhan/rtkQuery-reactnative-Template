import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scaleSize} from '../../utils';
import Colors from '../../constants/Colors';

const HStack = ({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  mb = scaleSize(0),
  mt = scaleSize(0),
  props,
}) => {
  return (
    <View
      style={[
        styles.stackContainer,
        {
          justifyContent: justifyContent,
          alignItems: alignItems,
          marginBottom: mb,
          marginTop: mt,
        },
        props,
      ]}>
      {children}
    </View>
  );
};

export default HStack;

const styles = StyleSheet.create({
  stackContainer: {
    flexDirection: 'row',
  },
});
