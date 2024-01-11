import {View, Text} from 'react-native';
import React from 'react';
import {scaleSize} from 'utils/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomePageSkeleton = () => {
  return (
    <View
      style={{
        marginTop: scaleSize(20),
        // paddingBottom: scaleSize(60),
        paddingHorizontal: scaleSize(20),
      }}>
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            width: scaleSize(100),
            height: scaleSize(20),
            borderRadius: 50,
            marginBottom: scaleSize(12),
          }}
        />
        <View
          style={{
            width: scaleSize(200),
            height: scaleSize(15),
            borderRadius: 100,
            marginTop: scaleSize(5),
            marginBottom: scaleSize(5),
          }}
        />
        <View
          style={{
            width: '100%',
            height: scaleSize(10),
            borderRadius: 20,
            marginBottom: scaleSize(5),
          }}
        />
        <View
          style={{
            width: '100%',
            height: scaleSize(10),
            borderRadius: 20,
            marginBottom: scaleSize(5),
          }}
        />
        <View style={{width: '80%', height: scaleSize(10), borderRadius: 20}} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} marginTop={scaleSize(20)}>
        <View
          style={{
            width: scaleSize(100),
            height: scaleSize(20),
            borderRadius: 50,
            marginTop: scaleSize(20),
            marginBottom: scaleSize(12),
          }}
        />
        <View
          style={{
            width: scaleSize(200),
            height: scaleSize(15),
            borderRadius: 100,
            marginTop: scaleSize(5),
            marginBottom: scaleSize(5),
          }}
        />
        <View
          style={{
            width: '100%',
            height: scaleSize(10),
            borderRadius: 20,
            marginBottom: scaleSize(5),
          }}
        />
        <View
          style={{
            width: '100%',
            height: scaleSize(10),
            borderRadius: 20,
            marginBottom: scaleSize(5),
          }}
        />
        <View style={{width: '80%', height: scaleSize(10), borderRadius: 20}} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default HomePageSkeleton;
