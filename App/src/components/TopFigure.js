import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {height, width} from '../config/config';

const TopFigure = ({topFigureImage,clustered=true}) => {
  return (
    <View style={[styles.logoContainer,{ marginLeft: clustered && -20,}]}>
      <Image
        source={
          topFigureImage ? {uri: topFigureImage} : require('../assets/1.jpg')
        }
        style={styles.img}
      />
    </View>
  );
};

const avatarWidth = width / 12;
const postHeight = height / 1.7;

export default TopFigure;

const styles = StyleSheet.create({
  logoContainer: {
    width: avatarWidth,
    height: avatarWidth,
    backgroundColor: 'transparent',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth:2,
    borderColor:'black'
   
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
