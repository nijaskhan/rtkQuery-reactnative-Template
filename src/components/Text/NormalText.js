import React from 'react';
import {Appearance, Text} from 'react-native';
import Colors from '../../constants/Colors';

export default function NormalText({
  props,
  fontSize,
  text,
  fontWeight = 500,
  colorLight = Colors.textDefault,
  colorDark = Colors.textDefaultDark,
  noOfLines = 1,
  fontStyle = 'normal',
  fontFamily = 'Montserrat-Regular',
  letterSpacing = 0.5,
  styles = [],
}) {
  const colorMode = Appearance.getColorScheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: colorMode == 'dark' ? colorDark : colorLight,
          fontStyle: fontStyle,
          fontFamily: fontFamily,
          letterSpacing: letterSpacing,
          flexWrap: 'wrap',
        },
        styles,
      ]}
      numberOfLines={noOfLines}>
      {text}
    </Text>
  );
}
