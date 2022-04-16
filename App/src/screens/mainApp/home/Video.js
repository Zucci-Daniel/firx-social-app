import React from 'react';
import {View, StyleSheet} from 'react-native';
import {width} from '../../../config/config';

const Video = () => {
  return <View style={styles.container}></View>;
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    width: width,
  },
});
