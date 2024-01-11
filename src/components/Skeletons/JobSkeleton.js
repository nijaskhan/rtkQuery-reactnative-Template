import {View, Text} from 'react-native';
import React from 'react';
import {scaleSize} from 'utils/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Colors from '../../constants/Colors';

const JobSkeleton = () => {
  return (
    <View
      style={{
        paddingHorizontal: scaleSize(20),
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(60),
      }}>
      <View
        style={{
          width: '100%',
          borderRadius: scaleSize(6),
          backgroundColor: Colors.white,
          borderColor: Colors.textGreyLight,
          borderWidth: 0.5,
          padding: scaleSize(8),
          marginTop: scaleSize(15),
        }}>
        <SkeletonPlaceholder borderRadius={4}>
          <View
            style={{
              width: scaleSize(100),
              height: scaleSize(10),
              borderRadius: 20,
              marginBottom: scaleSize(10),
            }}></View>
          <View
            style={{
              width: scaleSize(300),
              height: scaleSize(10),
              borderRadius: 20,
              marginBottom: scaleSize(2),
            }}
          />
          <View
            style={{
              width: scaleSize(300),
              height: scaleSize(10),
              borderRadius: 20,
              marginBottom: scaleSize(2),
            }}
          />
          <View
            style={{
              width: scaleSize(300),
              height: scaleSize(10),
              borderRadius: 20,
              marginBottom: scaleSize(2),
            }}
          />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default JobSkeleton;
