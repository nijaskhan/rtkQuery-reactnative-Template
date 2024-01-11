import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearUser, setDrawerOpen} from 'features/Auth/AuthSlice';
import Colors from '../../constants/Colors';
import HeaderTypes from '../../constants/HeaderTypes';
import {_Header} from '../../styles';
import Icon from '../Icon';
import {scaleFont} from '../../utils';
import FastImage from 'react-native-fast-image';
import NormalText from '../Text/NormalText';
import {FontSize} from '../../constants/Fonts';
import {Logo} from '../../assets';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

function Header({
  title = 'Header',
  children,
  color = Colors.transparent,
  headerType,
  hasBackButton,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const onOpenDrawer = React.useCallback(() => {
    dispatch(setDrawerOpen({status: true}));
  });

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <View
      style={[
        styles().container,
        {backgroundColor: Colors.white, alignItems: 'center'},
      ]}>
      {hasBackButton ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            title == 'Discover'
              ? navigation.navigate('HomeNav')
              : navigation.goBack();
          }}>
          <Icon name="back" size={scaleFont(20)} color={Colors.black} />
        </TouchableOpacity>
      ) : null}
      {title == 'Staragent' ? (
        <View
          style={{
            flex: 1,
          }}>
          <FastImage
            source={Logo.singleLogo}
            alt="image"
            resizeMode={FastImage.resizeMode.cover}
            style={{width: scaleFont(30), height: scaleFont(30)}}
          />
        </View>
      ) : (
        <NormalText
          text={title}
          fontSize={FontSize.medium}
          colorLight={Colors.black}
          fontWeight={500}
        />
      )}
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity activeOpacity={0.7} onPress={showMenu}>
            <Icon name="menu" size={scaleFont(20)} color={Colors.black} />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>Change Password</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Logout</MenuItem>
      </Menu>
    </View>
  );
}
const styles = (headerType = HeaderTypes.DETAIL_VIEW) =>
  StyleSheet.create({
    container: {
      ..._Header(headerType),
      flexDirection: 'row',
    },
  });

export default Header;
