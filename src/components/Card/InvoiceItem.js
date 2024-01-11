import React from 'react';
import {WINDOW_WIDTH, scaleSize} from '../../utils/index';
import ImageView from 'react-native-image-viewing';
import {useState} from 'react';
import {useEffect} from 'react';
import {Pressable, View} from 'react-native';
import Colors from '../../constants/Colors';
import CImage from '../CImage';

export default function InvoiceItem({item, onPress, index, image}) {
  const [visible, setIsVisible] = useState(false);
  const [imageData, setImageData] = useState([]);
  const imageWidth = WINDOW_WIDTH / 3 - 28;
  const imageHeight = imageWidth;

  const onImageClick = image => {
    let imageList = [
      {
        uri: image,
      },
    ];
    setImageData(imageList);
  };

  useEffect(() => {
    if (imageData.length > 0) {
      setIsVisible(true);
    }
  }, [imageData]);

  return (
    <View>
      <Pressable alignItems="center" onPress={onPress}>
        <View
          style={{
            maxWidth: imageWidth,
            borderRadius: scaleSize(4),
            overflow: 'hidden',
            borderColor: Colors.textGreyLight,
            borderWidth: 1,
            backgroundColor: Colors.textMutedVariant,
            margin: scaleSize(1),
          }}>
          <Pressable onPress={() => onImageClick(item.mbf_file)}>
            <View
              width={imageWidth}
              height={imageHeight}
              style={{
                justifyContent: 'flex-start',
                width: imageWidth,
                height: imageHeight,
              }}>
              <CImage
                image={image}
                h={imageWidth}
                w={imageHeight}
                borderRadius={scaleSize(2)}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
      <ImageView
        images={imageData}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        keyExtractor={imageSrc => imageSrc.uri}
      />
    </View>
  );
}
