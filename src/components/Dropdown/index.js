import RNPickerSelect from 'react-native-picker-select';
import {scaleFont, scaleSize} from '../../utils';
import Colors from '../../constants/Colors';
import {StyleSheet, View} from 'react-native';
import HStack from '../HStack';
import NormalText from '../Text/NormalText';
import Icon from '../Icon';

export const Dropdown = ({
  items,
  showLabel = false,
  labelSize = scaleFont(13),
  label,
  isMandatory = false,
  style = {},
  onValueChange,
  value,
}) => {
  return (
    <View style={[style]}>
      {showLabel ? (
        <HStack
          justifyContent="flex-start"
          alignItems="center"
          mb={scaleSize(5)}>
          <NormalText
            fontSize={labelSize}
            colorLight={Colors.textMuted}
            text={label}
          />

          {isMandatory ? (
            <NormalText
              fontSize={labelSize}
              colorLight={Colors.error}
              text={' *'}
            />
          ) : null}
        </HStack>
      ) : null}
      <RNPickerSelect
        onValueChange={value => onValueChange(value)}
        items={items}
        value={value}
        style={pickerSelectStyles}
        Icon={() => {
          return <Icon name={'info'} size={scaleSize(20)} />;
        }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: scaleFont(14),
    paddingVertical: scaleFont(4),
    paddingHorizontal: scaleFont(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.textMutedVariant,
    borderRadius: 4,
    color: Colors.textDefault,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBorderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
