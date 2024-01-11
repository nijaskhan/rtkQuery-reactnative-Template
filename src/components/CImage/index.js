import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {scaleSize} from '../../utils';
import Colors from '../../constants/Colors';
import {MotiView} from 'moti';

const CImage = ({
  h = scaleSize(100),
  w = scaleSize(100),
  image,
  index = 0,
  borderRadius = scaleSize(0),
}) => {
  const [isLoading, setLoading] = useState(true);

  function onLoadStart() {
    setLoading(true);
  }

  function onLoadEnd() {
    setLoading(false);
  }

  return (
    <MotiView
      from={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{delay: index * 100}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: w,
          height: h,
          backgroundColor: Colors.acceptedColor,
          borderRadius: borderRadius,
          overflow: 'hidden',
        }}>
        <FastImage
          fallback={true}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          style={[{width: w, height: h}]}
          source={{
            uri: image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {isLoading && <ActivityIndicator size={'small'} />}
      </View>
    </MotiView>
  );
};

export default CImage;

const styles = StyleSheet.create({});
