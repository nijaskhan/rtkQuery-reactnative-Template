import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const CModal = ({isModalVisible, toggleModal}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={{flex: 1}}>
        <Text>Hello!</Text>

        <Button title="Hide modal" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

export default CModal;

const styles = StyleSheet.create({});
