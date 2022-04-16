import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {width} from '../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SendPost = ({extraSendPostStyles, onSend, shouldDisable}) => {
  return (
    <TouchableOpacity
      activeOpacity={shouldDisable ? 1 : 0.6}
      onPress={shouldDisable ? null : onSend}>
      <View
        style={[
          styles.container,
          extraSendPostStyles,
          {backgroundColor: shouldDisable ? 'gray' : 'green'},
        ]}>
        <FontAwesome name="send" size={30} color={'white'} />
      </View>
    </TouchableOpacity>
  );
};

export default SendPost;
const size = width / 7;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
});
