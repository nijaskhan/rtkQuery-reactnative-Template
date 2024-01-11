import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Colors from '../../constants/Colors';

const SearchableDropDown = ({items}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <View>
      <SearchableDropdown
        selectedItems={selectedItems}
        onItemSelect={item => {
          setSelectedItems(item);
        }}
        containerStyle={{padding: 5}}
        onRemoveItem={(item, index) => {
          const items = selectedItems.filter(sitem => sitem.id !== item.id);
          selectedItems(items);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: Colors.textMutedVariant,
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{color: Colors.textDefault}}
        itemsContainerStyle={{maxHeight: 140}}
        items={items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'placeholder',
          underlineColorAndroid: Colors.textMutedVariant,
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: Colors.textMutedVariant,
            borderRadius: 5,
          },
          onTextChange: text => console.log(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
};

export default SearchableDropDown;

const styles = StyleSheet.create({});
