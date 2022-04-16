import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppBottomSheet from './AppBottomSheet';
import PostActionIcon from './PostActionIcon';
import {height, universalPadding, width, colors} from '../config/config';

const PostActions = ({
  actionRef,
  onStopSeeingThis,
  onSavePost,
  onCopyPostLink,
  onHightFive,
  onRepost,
  onUnfollow,
  iAuthoredThis = false,
  deletePost,
  onPostInfo,
}) => {
  const size = width / 10;

  return (
    <AppBottomSheet
      sheetID={actionRef}
      sheetHieght={iAuthoredThis ? height / 5 : height / 3}>
      <View style={styles.container}>
        {iAuthoredThis && (
          <View style={styles.iAuthoredThisStyles}>
            <PostActionIcon
              iconName="trash"
              columnMode
              size={size}
              value="delete this post"
              onPress={deletePost}
              color={colors.calmRed}
              valueColor={colors.calmRed}
            />
            <PostActionIcon
              iconName="info"
              columnMode
              size={size}
              value="post information"
              onPress={onPostInfo}
              color={colors.info}
              valueColor={colors.info}
            />
            <PostActionIcon
              iconName="copy"
              useDefault
              columnMode
              size={size}
              value="copy post link"
              onPress={onCopyPostLink}
            />
          </View>
        )}
        {!iAuthoredThis && (
          <>
            <View style={styles.actionRow}>
              <PostActionIcon
                iconName="eye-with-line"
                columnMode
                size={size}
                value="stop seeing this post"
                onPress={onStopSeeingThis}
              />
              <PostActionIcon
                iconName="save"
                columnMode
                size={size}
                value="save this post"
                onPress={onSavePost}
              />
              <PostActionIcon
                iconName="copy"
                useDefault
                columnMode
                size={size}
                value="copy post link"
                onPress={onCopyPostLink}
              />
            </View>
            <View style={styles.actionRow}>
              <PostActionIcon
                iconName="hand"
                columnMode
                size={size}
                value="high 5 this post"
                onPress={onHightFive}
              />
              <PostActionIcon
                iconName="cycle"
                columnMode
                size={size}
                value="repost "
                onPress={onRepost}
              />
              <PostActionIcon
                iconName="circle-with-minus"
                columnMode
                size={size}
                value="unfollow author"
                onPress={onUnfollow}
              />
            </View>
          </>
        )}
      </View>
    </AppBottomSheet>
  );
};

export default PostActions;

const styles = StyleSheet.create({
  container: {
    padding: universalPadding / 2,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  actionRow: {
    width: '80%',
    justifyContent: 'space-between',
  },
  iAuthoredThisStyles: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
