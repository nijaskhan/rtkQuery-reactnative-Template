import {TextInput, View} from 'react-native';
import React, {useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleFont} from 'utils/index';
import {scaleSize} from '../../utils';
import NormalText from '../Text/NormalText';
import Colors from '../../constants/Colors';
import HStack from '../HStack';
import Icon from '../Icon';

export default function InputFields({
  isInvalid = false,
  label,
  placeHolder,
  value,
  setValue,
  error,
  type = 'text',
  isReadOnly = false,
  onAction = null,
  labelSize = scaleFont(13),
  labelFontWeight = 400,
  isMandatory = true,
  variant = 'underlined',
  showLabel = true,
  textSize = scaleFont(14),
  multiline = false,
  noOfLines = 1,
  keyboardType = 'default',
  maxLength = 32,
  style = {},
  labelColor = Colors.label,
  iconName = 'info',
  iconSize = scaleFont(15),
  iconColor = Colors.black,
}) {
  return (
    <View style={[{marginBottom: scaleSize(6)}, style]}>
      {showLabel ? (
        <HStack justifyContent="flex-start" alignItems="center">
          <NormalText
            fontSize={labelSize}
            colorLight={labelColor}
            text={label}
            fontWeight={labelFontWeight}
            props={{marginBottom: scaleSize(10)}}
          />

          {isMandatory ? (
            <NormalText
              fontSize={labelSize}
              colorLight={Colors.error}
              text={' *'}
            />
          ) : null}
        </HStack>
      ) : null}

      <HStack
        justifyContent="space-between"
        alignItems="center"
        props={{
          paddingTop: scaleSize(10),
          paddingBottom: scaleSize(7),
          borderBottomColor: Colors.borderColor,
          borderBottomWidth: 1,
        }}>
        {iconName != '' ? (
          <Icon name={iconName} size={iconSize} color={iconColor} />
        ) : null}
        <TextInput
          inputMode={type}
          secureTextEntry={label == 'Password' ? true : false}
          style={[
            {
              paddingRight: scaleSize(10),
              paddingLeft: iconName == '' ? scaleSize(0) : scaleSize(5),
              fontSize: textSize,
              width: '100%',
            },
          ]}
          placeholder={placeHolder}
          placeholderTextColor={Colors.textMuted}
          onChangeText={val => {
            setValue(val);
          }}
          // pointerEvents={!isReadOnly ? 'none' : 'auto'}
          showSoftInputOnFocus={isReadOnly ? false : true}
          onPressIn={onAction}
          onTouchEnd={onAction}
          value={value ? value : ''}
          editable={!isReadOnly}
          multiline={multiline ? true : false}
          numberOfLines={noOfLines}
          keyboardType={keyboardType}
          maxLength={maxLength ? maxLength : 32}></TextInput>
      </HStack>
      {isInvalid ? (
        <HStack justifyContent="flex-start" mt={scaleSize(5)}>
          <Icon name="info" size={scaleFont(15)} />
          <NormalText
            fontSize={scaleFont(11)}
            colorLight={Colors.error}
            text={error}
            props={{marginLeft: scaleSize(5)}}
          />
        </HStack>
      ) : null}
    </View>
  );
}
