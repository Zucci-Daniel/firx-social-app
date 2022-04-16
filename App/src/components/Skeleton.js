import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {avatarWidth, colors, postHeight, width} from '../config/config';
import Post from './Post/Post';

const Skeleton = ({isLoading = true, children}) => {
  
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        padding={10}>
        <SkeletonPlaceholder.Item
          width={avatarWidth}
          height={avatarWidth}
          borderRadius={avatarWidth}
        />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={width / 1.6}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width / 3}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={width}
        height={postHeight / 2}
        marginTop={10}
      />
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
