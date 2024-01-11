import {useNavigation} from '@react-navigation/native';
import {setJobClick} from 'features/Auth/AuthSlice';
import {MotiView} from 'moti';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {lists, scaleFont, scaleSize} from 'utils/index';
import Colors from '../../constants/Colors';
import HStack from '../HStack';
import NormalText from '../Text/NormalText';
import Icon from '../Icon';
import {FontSize} from '../../constants/Fonts';

export default function JobSmallItem({item, onPress, index}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <MotiView
      from={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{delay: index * 200}}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
        <View
          style={{
            width: '100%',
            borderRadius: scaleSize(6),
            backgroundColor: Colors.infoColor,
            padding: scaleSize(12),
            marginTop: scaleSize(6),
          }}>
          <HStack
            alignItems={'center'}
            justifyContent="flex-start"
            mb={scaleSize(2)}>
            <HStack
              alignItems={'center'}
              justifyContent="flex-start"
              props={{flex: 1}}>
              <View
                style={{
                  width: scaleFont(11),
                  height: scaleFont(11),
                  borderRadius: scaleFont(6),
                  marginRight: scaleSize(6),
                  backgroundColor:
                    item?.jobAccept != 'A'
                      ? Colors.cancelColor
                      : Colors.acceptColor,
                }}
              />
              <NormalText
                text={item?.jobTitle}
                fontSize={FontSize.smallVariantPlus}
                colorLight={Colors.black}
                fontWeight={600}
                noOfLines={1}
                styles={{paddingRight: scaleSize(20)}}
              />
            </HStack>
            <Pressable
            // onPress={() =>
            //   navigation.navigate(Screens.JOB_DETAILS, {data: lists[2]})
            // }
            >
              <Icon
                name="arrow-forward"
                size={scaleFont(15)}
                color={Colors.textMuted}
              />
            </Pressable>
          </HStack>
          <NormalText
            text={item?.jobDesc}
            fontSize={FontSize.smallVariant}
            colorLight={Colors.textDefault}
            fontWeight={400}
            noOfLines={1}
            props={{marginTop: scaleSize(8)}}
          />
          <HStack
            mt={scaleSize(2)}
            alignItems={'center'}
            justifyContent="flex-start"
            props={{marginTop: scaleSize(8)}}>
            <Icon
              name="calendar"
              size={scaleFont(12)}
              color={Colors.textDefault}
            />
            <NormalText
              text={item?.jobDate}
              fontSize={FontSize.smallVariant}
              colorLight={Colors.textDefault}
              fontWeight={500}
              props={{marginLeft: scaleSize(5)}}
            />
          </HStack>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}
