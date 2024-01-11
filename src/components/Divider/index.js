import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {scaleFont} from '../../utils';

const Divider = ({style}) => {
  return (
    <View
      style={[
        style,
        {
          backgroundColor: Colors.textGreyLight,
          width: '100%',
          height: scaleFont(1),
        },
      ]}></View>
  );
};

export default Divider;

const styles = StyleSheet.create({});
