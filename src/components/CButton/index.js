import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scaleFont, scaleSize} from '../../utils';
import Colors from '../../constants/Colors';
import Icon from '../Icon';

const CButton = ({
  onPress,
  text,
  fontSize = scaleFont(14),
  px = 0,
  py = 0,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  bgColor = Colors.primaryColor,
  textColor = Colors.white,
  h = scaleFont(40),
  w = '100%',
  fontWeight = 500,
  isLoading = false,
  isLoadingText = 'Please wait..',
  isDisabled = false,
  iconName = 'info',
  iconSize = scaleFont(12),
  iconColor = Colors.black,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: bgColor,
          color: textColor,
          marginTop: mt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          paddingHorizontal: px,
          paddingVertical: py,
          height: h,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          flexDirection: 'row',
        },
      ]}
      onPress={onPress}
      disabled={isDisabled}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={textColor}
          style={[{marginRight: scaleFont(5)}]}
        />
      ) : iconName != '' ? (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      ) : null}

      <Text
        style={{
          fontSize: fontSize,
          color: textColor,
          fontWeight: fontWeight,
          alignItems: 'center',
          marginLeft: iconName == '' ? scaleSize(0) : scaleSize(5),
          opacity: isLoading ? 0.5 : 1,
        }}>
        {isLoading ? isLoadingText : text}
      </Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({});
