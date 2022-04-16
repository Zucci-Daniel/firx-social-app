import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {width} from '../config/config';

const PlayIcon = ({
  iconName = 'play',
  size = 60,
  color = 'red',
  extraPlayStyles,
  onPress,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} style={extraPlayStyles}>
      <Ionicons
        name={iconName}
        size={size}
        color={color}
        style={[styles.icon, styles.shadow, extraPlayStyles]}
      />
    </TouchableNativeFeedback>
  );
};

export default PlayIcon;

const styles = StyleSheet.create({
  container: {
    width: width,
    margin: 0,
  },
});
