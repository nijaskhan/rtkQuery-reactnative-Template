import {Dimensions} from 'react-native';
import {scaleSize} from 'utils';

const Spacing = {
  xstiny: scaleSize(1),
  tiny: scaleSize(2),
  tinyVariant: scaleSize(4),
  xs: scaleSize(6),
  xsVariant: scaleSize(8),
  xsVariant2: scaleSize(10),
  small: scaleSize(12),
  smallVariant1: scaleSize(13),
  smallVariant: scaleSize(14),
  regular: scaleSize(16),
  medium: scaleSize(18),
  mediumVariant: scaleSize(20),
  large: scaleSize(24),
  xlarge: scaleSize(30),
  xlargeVariant: scaleSize(34),
  xxlarge: scaleSize(48),
  xxxlarge: scaleSize(72),
  largeVariant: scaleSize(96),
};

const Rounded = {
  tinyVariant: scaleSize(2),
  tiny: scaleSize(3),
  xsVariant: scaleSize(4),
  xs: scaleSize(5),
  small: scaleSize(8),
  smallVariant: scaleSize(10),
  regular: scaleSize(16),
  medium: scaleSize(20),
  large: scaleSize(24),
  xlarge: scaleSize(30),
};

const Elevation = {
  regular: scaleSize(10),
};

const TabBarHeight = scaleSize(60);

const HeaderHeight = scaleSize(60);

const ButtonOffset = scaleSize(54);

const chatEntryViewHeight = scaleSize(62);

const BottomBarHeight = scaleSize(50);

const NotificationBadge = {
  width: scaleSize(16),
  height: scaleSize(16),
  offsetTop: scaleSize(5),
  offsetRight: scaleSize(5),
  borderRadius: scaleSize(8),
};

const Border = {
  thin: scaleSize(1),
  medium: scaleSize(2),
  think: scaleSize(5),
};

const CarouselThumbnailWidth = scaleSize(48);

const SwipeHandle = {
  width: scaleSize(24),
  height: scaleSize(3),
  radius: scaleSize(3),
  offsetTop: scaleSize(15),
};

const ProfileAvatar = {
  width: scaleSize(70),
  height: scaleSize(70),
  radius: scaleSize(35),
};

const ChatAvatar = {
  width: scaleSize(55),
  height: scaleSize(55),
  radius: scaleSize(30),
};

const {width, height} = Dimensions.get('window');
const SIZE = 64;
const ICON_SIZE = SIZE * 0.6;
const SPACING = 12;
const s = scaleSize(300);

const PARALAX_LIST = {
  ITEM_WIDTH: s,
  ITEM_HIGHT: s * 0.65,
  RADIUS: 18,
  SPACING,
  FULL_SIZE: s + SPACING,
  SCREEN_WIDTH: width,
};

export {
  Spacing,
  Rounded,
  TabBarHeight,
  Elevation,
  HeaderHeight,
  NotificationBadge,
  Border,
  ButtonOffset,
  CarouselThumbnailWidth,
  chatEntryViewHeight,
  SwipeHandle,
  ProfileAvatar,
  ChatAvatar,
  BottomBarHeight,
  width,
  height,
  ICON_SIZE,
  SIZE,
  SPACING,
  PARALAX_LIST,
};
