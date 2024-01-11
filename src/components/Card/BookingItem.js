import {useNavigation} from '@react-navigation/native';
import NormalText from 'components/Text/NormalText';
import {FontSize} from 'constants/Fonts';
import {setBookingClick} from 'features/Auth/AuthSlice';
import moment from 'moment';
import {MotiView} from 'moti';
import Screens from 'navigators/index';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {lists, scaleSize} from 'utils/index';
import Colors from '../../constants/Colors';
import HStack from '../HStack';
import {scaleFont} from '../../utils';
import Icon from '../Icon';

export default function BookingItem({item, onPress, index}) {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <MotiView
      from={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{delay: index * 200}}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
        <View
          style={{
            // width: '100%',
            borderRadius: scaleSize(6),
            backgroundColor: Colors.bookingColor,
            padding: scaleSize(15),
            marginTop: scaleSize(6),
          }}>
          <HStack>
            <HStack
              props={{flex: 1}}
              alignItems={'center'}
              justifyContent="flex-start">
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: scaleSize(15),
                }}>
                <NormalText
                  text={moment(item?.eventStartDate, 'DD MMM YYYY').format(
                    'MMM',
                  )}
                  fontSize={FontSize.smallVariant}
                  colorLight={Colors.textGrey}
                  fontWeight={500}
                />
                <NormalText
                  text={moment(item?.eventStartDate, 'DD MMM YYYY').format(
                    'DD',
                  )}
                  fontSize={FontSize.largeVariant}
                  colorLight={Colors.black}
                  fontWeight={700}
                />
              </View>
              <View style={{width: '85%'}}>
                <NormalText
                  text={item?.eventTitle}
                  fontSize={FontSize.smallVariantPlus}
                  colorLight={Colors.black}
                  fontWeight={600}
                  styles={{paddingRight: scaleSize(10)}}
                />
                <NormalText
                  text={
                    item?.eventDesc != '' ? item?.eventDesc : 'No Description'
                  }
                  fontSize={FontSize.smallVariant}
                  colorLight={Colors.textDefault}
                  fontWeight={400}
                  noOfLines={1}
                  props={{marginTop: scaleSize(5), marginBottom: scaleSize(2)}}
                />

                <HStack
                  mt={scaleSize(8)}
                  alignItems={'center'}
                  justifyContent="flex-start">
                  <Icon
                    name="clock"
                    size={scaleFont(12)}
                    color={Colors.textDefault}
                  />
                  <NormalText
                    text={moment(item?.startTime, 'hh:mm:ss').format('hh:mm')}
                    fontSize={FontSize.smallVariant}
                    colorLight={Colors.textDefault}
                    fontWeight={500}
                    noOfLines={1}
                    props={{marginLeft: scaleSize(5)}}
                  />
                  <NormalText
                    text={` - ${moment(item?.endTime, 'hh:mm:ss').format(
                      'hh:mm',
                    )}`}
                    fontSize={FontSize.smallVariant}
                    colorLight={Colors.textDefault}
                    fontWeight={500}
                    noOfLines={1}
                  />
                </HStack>
              </View>
            </HStack>
            <Pressable
              style={{
                alignSelf: 'flex-start',
              }}>
              <Icon
                name="arrow-forward"
                size={scaleFont(15)}
                color={Colors.textGreyLight}
              />
            </Pressable>
          </HStack>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}
