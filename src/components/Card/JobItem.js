import {MotiView} from 'moti';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {scaleFont, scaleSize} from '../../utils';
import Colors from '../../constants/Colors';
import Badge from '../Badge';
import NormalText from '../Text/NormalText';
import {FontSize} from '../../constants/Fonts';
import HStack from '../HStack';
import Icon from '../Icon';
import CButton from '../CButton';

export default function JobItem({
  item,
  onPress,
  index,
  onAcceptClick,
  onCancelClick,
  isJobStatusUpdating,
  isJobCancelled,
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <MotiView
      from={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{delay: index * 200}}>
      <View
        style={{
          width: '100%',
          borderRadius: scaleSize(6),
          backgroundColor: Colors.white,
          borderColor: Colors.textGreyLight,
          borderWidth: 0.5,
          padding: scaleSize(12),
          marginTop: scaleSize(15),
        }}>
        {item.jobAccept == 'A' || item.jobAccept == 'R' ? (
          <Badge
            bg={item.jobAccept == 'A' ? Colors.acceptColor : Colors.cancelColor}
            borderRadius={scaleSize(20)}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            mt={scaleSize(-8)}
            mr={scaleSize(-6)}
            containerStyle={{
              paddingHorizontal: scaleSize(10),
              paddingVertical: scaleSize(6),
              position: 'absolute',
            }}>
            <NormalText
              fontSize={FontSize.xs}
              colorLight={Colors.white}
              textTransform="capitalize"
              text={
                item.jobAccept == 'A' ? 'Accepted' : 'Cancelled'
              }></NormalText>
          </Badge>
        ) : null}
        <NormalText
          fontSize={FontSize.regular}
          colorLight={Colors.textDark}
          fontWeight={600}
          props={{
            marginTop: scaleSize(8),
            marginBottom: scaleSize(10),
          }}
          letterSpacing={0}
          text={item.jobTitle}></NormalText>
        <NormalText
          fontSize={FontSize.small}
          colorLight={Colors.textDefault}
          fontWeight={400}
          text={item.jobDesc}></NormalText>
        <HStack
          mt={scaleSize(10)}
          alignItems={'center'}
          justifyContent="f;ex-start">
          <Icon
            name="calendar-outline"
            size={FontSize.small}
            color={Colors.textDefault}
          />
          <NormalText
            fontSize={FontSize.small}
            colorLight={Colors.textDefault}
            fontWeight={400}
            props={{marginLeft: scaleSize(5)}}
            text={item.jobDate.split('-')[0] + ' '}></NormalText>
          <Icon
            name="calendar-outline"
            size={FontSize.small}
            color={Colors.textDefault}
          />
          <NormalText
            fontSize={FontSize.small}
            colorLight={Colors.textDefault}
            fontWeight={400}
            props={{marginLeft: scaleSize(5)}}
            text={item.jobDate.split('-')[1]}></NormalText>
        </HStack>
        <HStack
          mt={scaleSize(8)}
          alignItems={'center'}
          justifyContent="f;ex-start">
          <Icon name="map" size={FontSize.small} color={Colors.textDefault} />
          <NormalText
            fontSize={FontSize.small}
            colorLight={Colors.textDefault}
            fontWeight={400}
            props={{marginLeft: scaleSize(5)}}
            text={item.jobVenue}></NormalText>
        </HStack>
        {item.jobAccept == '' || item.jobAccept == 'N' ? (
          <HStack mt={scaleSize(12)} justifyContent="f;ex-start">
            <CButton
              onPress={() => onAcceptClick()}
              h={scaleSize(30)}
              mr={scaleSize(8)}
              bgColor={Colors.acceptColor}
              isLoading={isJobStatusUpdating}
              isLoadingText="Please wait.."
              iconName="tick"
              iconSize={scaleFont(10)}
              iconColor={Colors.white}
              text={'Accept'}
              textColor={Colors.white}
              fontSize={FontSize.xs}
              isDisabled={isJobStatusUpdating}
              px={scaleSize(10)}
            />
            <CButton
              onPress={() => onCancelClick()}
              h={scaleSize(30)}
              bgColor={Colors.error}
              isLoading={isJobCancelled}
              isLoadingText="Please wait.."
              iconName="cross"
              iconSize={scaleFont(10)}
              iconColor={Colors.white}
              text={'Cancel'}
              textColor={Colors.white}
              fontSize={FontSize.xs}
              px={scaleSize(10)}
            />
          </HStack>
        ) : null}
      </View>
    </MotiView>
  );
}
