import React from 'react';
import {View, StyleSheet} from 'react-native';
import {width} from '../../../config/config';

const Photo = () => {
  return <View style={styles.container}></View>;
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    width: width,
  },
});
