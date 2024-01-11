import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import CheckBox from '@react-native-community/checkbox';
import {scaleSize} from '../../utils';
import Colors from '../../constants/Colors';

const MultiDropDown = ({bottomSheetRef, data, selectedData}) => {
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');
  const keyExtractor = (item, index) => `${index}`;
  const [tempData, setTempData] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    setTempData(data);
  }, [data]);

  const handleSearch = key => {
    setSearchKey(key);
    const result = data.filter(item => filterData(item, key));
    setTempData(result);
  };

  function filterData(item, key) {
    return item.name.includes(key);
  }

  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
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

  const renderItem = useCallback(
    ({item, index}) => (
      <View style={styles.itemContainer} key={`${item.name}.${index}`}>
        <Text>{item.name}</Text>
        <CheckBox
          value={item.isSelected}
          onValueChange={value => selectedData(index, value)}
          style={[
            styles.checkbox,
            {width: scaleSize(15), height: scaleSize(15)},
          ]}
          boxType="square"
        />
      </View>
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}>
      <>
        <BottomSheetTextInput
          key={'search'}
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchKey}
          clearButtonMode="while-editing"
        />
        <BottomSheetFlatList
          data={tempData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </>
    </BottomSheetModal>
  );
};

export default MultiDropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    width: '100%',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 20,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: Colors.textMutedVariant,
    borderWidth: 1,
  },
});
