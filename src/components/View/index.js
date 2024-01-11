import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const CView = ({style, children}) => {
  return <View style={[style]}>{children}</View>;
};

export default CView;

const styles = StyleSheet.create({});
