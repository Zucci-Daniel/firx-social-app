import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, width} from '../config/config';

const AppIconButton = ({
  onPress,
  iconName = 'add',
  extraStyle,
  color = colors.pureWhite,
  size = 40,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cancel, extraStyle]}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({
  cancel: {
    alignSelf: 'center',
    backgroundColor:'black',
    
    borderRadius:10
    // justifyContent:'center'
  },
});
