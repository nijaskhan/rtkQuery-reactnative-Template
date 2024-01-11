import {StyleSheet} from 'react-native';
import React from 'react';
import NormalText from 'components/Text/NormalText';
import {FontSize} from 'constants/Fonts';
import Center from '../Center';
import Icon from '../Icon';
import {scaleFont, scaleSize} from '../../utils';
import Colors from '../../constants/Colors';

const EmptyElement = ({page}) => {
  switch (page) {
    case 'booking':
      return (
        <Center h={200}>
          <Icon
            name={'info'}
            size={scaleFont(20)}
            color={Colors.textGreyLight}
          />
          <NormalText
            text={'Results Not Found'}
            fontWeight={600}
            colorLight={Colors.textGreyLight}
            fontSize={FontSize.medium}
            props={{marginTop: scaleSize(15)}}
          />
        </Center>
      );
    case 'job':
      return (
        <Center h={'50%'}>
          <Icon
            name={'info'}
            size={scaleFont(20)}
            color={Colors.textGreyLight}
          />
          <NormalText
            text={'No Job Posted'}
            fontWeight={600}
            colorLight={Colors.textGreyLight}
            fontSize={FontSize.medium}
            props={{marginTop: scaleSize(15)}}
          />
        </Center>
      );
    case 'home_job':
      return (
        <Center style={{marginTop: scaleSize(20)}}>
          <Icon
            name={'info'}
            size={scaleFont(20)}
            color={Colors.textGreyLight}
          />
          <NormalText
            text={'Results Not Found'}
            fontWeight={600}
            colorLight={Colors.textGreyLight}
            fontSize={FontSize.medium}
            props={{marginTop: scaleSize(15)}}
          />
        </Center>
      );
    default:
      break;
  }
};

export default EmptyElement;

const styles = StyleSheet.create({});
