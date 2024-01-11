import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import {NotificationBadge, Spacing} from '../../constants/Layout';
import {_NotificationBadge, _Badge} from '../../styles';

const Badge = ({
  children,
  containerStyle,
  bg = Colors.blockedColor,
  borderRadius = 0,
  zIndex = 1,
  variant = 'solid',
  alignSelf = 'center',
  mt = 0,
  mr = 0,
  ml = 0,
  mb = 0,
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: bg},
        {borderRadius: borderRadius},
        {
          zIndex: zIndex,
          alignSelf: alignSelf,
          marginLeft: ml,
          marginTop: mt,
          marginRight: mr,
          marginBottom: mb,
        },
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    ..._Badge,
  },
  notificationCounter: {
    ..._NotificationBadge,
    backgroundColor: Colors.counterBg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -NotificationBadge.offsetRight,
    top: -NotificationBadge.offsetTop,
  },
});

export default Badge;
