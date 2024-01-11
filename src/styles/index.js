import HeaderTypes from '../constants/HeaderTypes';
import {Border, NotificationBadge, Rounded, Spacing} from '../constants/Layout';
import {scaleFont, scaleSize} from '../utils';

const {default: Colors} = require('../constants/Colors');
const {FontSize, Family} = require('../constants/Fonts');

const HeaderHeight = scaleFont(60);

const _SceneTitle = (inverted = false) => ({
  ..._Text(
    FontSize.large,
    Family.regular,
    inverted ? Colors.textLight : Colors.textDark,
  ),
});

const _Header = headerType => ({
  height: HeaderHeight,
  // backgroundColor: Colors.btnPrimaryBg,
  paddingHorizontal:
    headerType === HeaderTypes.TAB_VIEW
      ? Spacing.large
      : headerType === HeaderTypes.DETAIL_VIEW
      ? Spacing.regular
      : Spacing.xs,
  alignItems: 'center',
});

const _CalendarItem = {
  width: scaleSize(28),
  height: scaleSize(28),
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: Spacing.small,
  marginHorizontal: Spacing.xs,
  borderWidth: Border.thin,
  borderRadius: Rounded.xsVariant,
};

const _Badge = {
  borderRadius: Rounded.xs,
  alignSelf: 'flex-start',
  paddingHorizontal: Spacing.xs,
  paddingVertical: Spacing.tiny,
};

const _NotificationBadge = {
  width: NotificationBadge.width,
  height: NotificationBadge.height,
  borderRadius: NotificationBadge.borderRadius,
};

const _PlaceholderTextColor = (inverted = false) =>
  inverted ? Colors.placeholderTextColorInverted : Colors.placeholderTextColor;

export {
  _SceneTitle,
  _Header,
  HeaderHeight,
  _CalendarItem,
  _PlaceholderTextColor,
  _Badge,
  _NotificationBadge,
};
