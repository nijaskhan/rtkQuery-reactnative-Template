import {scaleFont, scaleSize} from '../utils';

const Family = {
  light: 'Rubik-Light',
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semibold: 'Rubik-SemiBold',
  bold: 'Rubik-Bold',
  extrabold: 'Rubik-ExtraBold',
};

const FontSize = {
  tiny: scaleFont(8),
  xs: scaleFont(10),
  small: scaleFont(11),
  smallVariant: scaleFont(12),
  smallVariantPlus: scaleFont(13),
  regularVariant: scaleFont(15),
  regular: scaleFont(14),
  medium: scaleFont(17),
  mediumVariant: scaleFont(19),
  large: scaleFont(20),
  largeVariant: scaleFont(24),
  largeVariantXs: scaleFont(28),
  xlarge: scaleFont(30),
  xxlarge: scaleFont(42),
};

const IconSize = {
  regular: scaleFont(12),
  regularVariant: scaleFont(14),
  medium: scaleFont(16),
  mediumVariant: scaleFont(18),
  mediumVariant1: scaleFont(20),
  large: scaleFont(24),
  large1: scaleFont(30),
  largeVariant: scaleFont(32),
  xlargeVariant1: scaleFont(44),
  xlarge: scaleFont(42),
  xxlarge: scaleFont(72),
};

const Leading = {
  small: scaleSize(12),
  regular: scaleSize(16),
  large: scaleSize(24),
};

export {Family, FontSize, IconSize, Leading};
