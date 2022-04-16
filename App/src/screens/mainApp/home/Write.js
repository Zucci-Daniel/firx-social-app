import React from 'react';
import {View, StyleSheet} from 'react-native';
import {width} from '../../../config/config';

const Write = () => {
  return <View style={styles.container}></View>;
};

export default Write;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    width: width,
  },
});
