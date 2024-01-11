import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Container from '../../components/Container';

const Skeletons = () => {
  return (
    <Container statusBar={true}>
      <SkeletonPlaceholder borderRadius={4}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{width: 60, height: 60}}></View>
        </View>
      </SkeletonPlaceholder>
    </Container>
  );
};

export default Skeletons;

const styles = StyleSheet.create({});
