import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {width, height} from '../config/config';
import FastImage from 'react-native-fast-image';

const AppPostImage = ({imageUri, useHeight = height / 2}) => {
  return (
    <Pressable>
      <View style={[styles.container, {height: useHeight}]}>
        <FastImage
          source={
            imageUri ? {uri: imageUri} : require('../../src/assets/henessy.jpg')
          }
          resizeMode={FastImage.resizeMode.cover}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </Pressable>
  );
};

export default AppPostImage;

const styles = StyleSheet.create({
  container: {
    width: width,
    margin: 0,
  },
});
