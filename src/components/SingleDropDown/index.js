import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Colors from '../../constants/Colors';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SingleDropDown = ({bottomSheetRef, data, selectedData}) => {
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={backdropPressBehavior}
      />
    ),
    [backdropPressBehavior],
  );

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Text onPress={() => selectedData(item)}>{item}</Text>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}>
      {() => {
        console.log('hiii');
        return (
          <BottomSheetFlatList
            data={data}
            keyExtractor={i => i}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        );
      }}
    </BottomSheetModal>
  );
};

export default SingleDropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});
