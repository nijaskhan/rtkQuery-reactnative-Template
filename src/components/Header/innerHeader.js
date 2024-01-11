import HeaderTypes from 'constants/HeaderTypes';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {_Header} from 'styles/';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Screens from 'navigators/index';
import HStack from '../HStack';
import Icon from '../Icon';
import {scaleFont, scaleSize} from '../../utils';
import Colors from '../../constants/Colors';
import Center from '../Center';
import NormalText from '../Text/NormalText';

function InnerHeader({
  title = 'Header',
  children,
  color = Colors.transparent,
  headerType,
  hasBackButton,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{..._Header(HeaderTypes.EDIT)}}>
      <HStack props={{flex: 1, width: '100%', backgroundColor: Colors.white}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{paddingLeft: scaleSize(8), paddingRight: scaleSize(10)}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="back" size={scaleFont(23)} color={Colors.textMuted} />
        </TouchableOpacity>
        <Center style={{flex: 1, alignItems: 'flex-start'}}>
          <NormalText
            colorLight={Colors.primaryBg}
            fontSize={scaleFont(20)}
            fontWeight={600}
            text={title}
          />
        </Center>
        {title == 'Profile' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{paddingRight: scaleSize(10)}}
            onPress={() => {
              let data = {
                id: '_1',
                image: 'img_1',
                title: 'Edit Profile',
                color: '',
                delay: 200,
              };
              // navigation.navigate(Screens.EDIT_PROFILE, {data});
            }}>
            <Icon name="edit" size={scaleFont(20)} />
          </TouchableOpacity>
        ) : null}
      </HStack>
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

export default InnerHeader;
