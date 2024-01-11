import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';

const MotiContainer = ({isToggled, delay, children}) => {
  return (
    <MotiView
      animate={{
        opacity: isToggled ? 1 : 0,
        transform: isToggled ? [{translateY: 0}] : [{translateY: 10}],
      }}
      transition={{
        type: 'spring',
        delay: delay,
      }}>
      {children}
    </MotiView>
  );
};

export default MotiContainer;

const styles = StyleSheet.create({});
