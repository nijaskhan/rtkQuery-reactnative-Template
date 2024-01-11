import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import Center from '../../components/Center';
import NormalText from '../../components/Text/NormalText';
import {FontSize} from '../../constants/Fonts';
import InputFields from '../../components/Inputs/InputFields';
import {scaleFont, scaleSize} from '../../utils';
import Divider from '../../components/Divider';
import {Dropdown} from '../../components/Dropdown';
import SingleDropDown from '../../components/SingleDropDown';
import MultiDropDown from '../../components/MultiDropDown';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import CImage from '../../components/CImage';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {Spacing} from '../../constants/Layout';

const Samples = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(true);
  const bottomSheetRef = useRef(null);
  const multiSheetRef = useRef(null);

  const [gender, setGender] = useState('Male');
  const [sports, setSports] = useState('');
  const data = ['Male', 'Female', 'Other'];
  const multiData = [
    {name: 'Cricket', isSelected: false, id: 1},
    {name: 'Football', isSelected: false, id: 2},
    {name: 'Hockey', isSelected: false, id: 3},
    {name: 'Tennis', isSelected: false, id: 4},
    {name: 'Racing', isSelected: false, id: 5},
  ];

  const homData = [
    {
      id: '_1',
      image:
        'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
      title: 'Profile',
      color: '',
      delay: 200,
    },
    {
      id: '_2',
      image:
        'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
      title: 'Photo Gallery',
      color: '',
      delay: 300,
    },
    {
      id: '_3',
      image:
        'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
      title: 'Video Gallery',
      color: '',
      delay: 400,
    },
  ];

  const [multiDropData, setMultiDropData] = useState(multiData);
  const [selectedMultiData, setSelectedMultiData] = useState('');

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleMultiModalPress = useCallback(() => {
    multiSheetRef.current?.present();
  }, []);

  const handleMultiClosePress = useCallback(() => {
    multiSheetRef.current?.close();
  }, []);

  const handleSelectedData = useCallback(value => {
    setGender(value);
    handleClosePress();
  }, []);

  const handleMultiSelectedData = useCallback((index, value) => {
    setMultiDropData(prevMultiDropData => {
      return prevMultiDropData.map((item, i) => {
        if (i === index) {
          return {...item, isSelected: value};
        } else {
          return item;
        }
      });
    });
  }, []);

  useEffect(() => {
    let data = '';
    multiDropData.map(item => {
      if (item.isSelected) {
        data = data + item.name + ',';
      }
    });
    setSelectedMultiData(data);
  }, [multiDropData]);

  return (
    <Container statusBar={false} paddingBottom={false}>
      <SingleDropDown
        bottomSheetRef={bottomSheetRef}
        data={data}
        selectedData={handleSelectedData}
      />
      <MultiDropDown
        bottomSheetRef={multiSheetRef}
        data={multiDropData}
        selectedData={handleMultiSelectedData}
      />
      <Center>
        <View style={[styles.container]}>
          <NormalText text={'Login'} fontSize={FontSize.largeVariantXs} />
          <InputFields
            isInvalid={usernameError}
            label={'Username'}
            placeHolder={''}
            icon={'at-outline'}
            value={username}
            setValue={val => setUsername(val)}
            error={'Email is not valid'}
            style={{marginTop: scaleSize(12)}}
          />

          <Dropdown
            style={{marginTop: scaleSize(12)}}
            showLabel={true}
            label={'Select Sports'}
            labelSize={scaleFont(13)}
            items={[
              {label: 'Football', value: 'football'},
              {label: 'Baseball', value: 'baseball'},
              {label: 'Hockey', value: 'hockey'},
            ]}
            onValueChange={value => console.log(value)}
            value={'football'}
          />

          <InputFields
            isInvalid={false}
            label={'Simple Dropdown'}
            placeHolder={''}
            icon={'at-outline'}
            value={gender}
            setValue={val => setGender(val)}
            error={''}
            isReadOnly={true}
            onAction={handlePresentModalPress}
            style={{marginTop: scaleSize(12)}}
            isMandatory={false}
          />

          <InputFields
            isInvalid={false}
            label={'Multi Dropdown'}
            placeHolder={''}
            icon={'at-outline'}
            value={selectedMultiData}
            setValue={val => setSports(val)}
            error={''}
            isReadOnly={true}
            onAction={handleMultiModalPress}
            style={{marginTop: scaleSize(12)}}
            isMandatory={false}
          />
          <CButton
            text={'Submit'}
            isLoading={false}
            onPress={() => console.log('sfdsf')}
          />
          <View
            style={{
              height: 150,
              width: SCREEN_WIDTH,
              marginTop: Spacing.medium,
            }}>
            <FlashList
              numColumns={3}
              data={homData}
              renderItem={({item, index}) => (
                <CImage image={item.image} index={index} />
              )}
              estimatedItemSize={200}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      width: scaleFont(11),
                      height: scaleFont(11),
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
      </Center>
    </Container>
  );
};

export default Samples;

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
});
