import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {postSize, universalPadding, width} from '../../config/config';
import PostActionIcon from './../PostActionIcon';

let defaultHieght = 50;

const PostFooter = ({
  thisHeight = defaultHieght,
  onShare,
  onPush,
  pushValue,
  onComment,
  extraIconStyles,
}) => {
  const actions = [
    {
      iconName: 'share-alternative',
      onPress: onPush,
      value: pushValue,
      showText: false,
      extraIconStyles: extraIconStyles,
    },
    {
      iconName: 'new-message',
      onPress: onComment,
      value: 55,
      showText: false,
      extraIconStyles: extraIconStyles,
    },
    {
      iconName: 'share',
      onPress: onShare,
      value: 120943,
      showText: false,
      extraIconStyles: extraIconStyles,
    },
  ];

  return (
    <View style={[styles.postFooter, {height: thisHeight}]}>
      <View style={styles.container}>
        {actions.map((action, index) => (
          <PostActionIcon
            key={index}
            iconName={action.iconName}
            value={action.value}
            showText={action.showText}
            onPress={action.onPress}
          />
        ))}
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  postFooter: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: universalPadding / 3,
  },
});
