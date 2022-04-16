import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AppLoading from '../../../components/AppLoading';

import {height, colors, universalPadding, width} from '../../../config/config';
import SponsorPost from './../../../components/SponsorPost';
import {getPost} from './../../../hooks/useOperation';

//Might have to be a stack later on
const ViewPost = ({navigation, route}) => {
  const {postId} = route.params;

  const [selectedPost, setSelectedPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetSelectedPost = async () => {
    try {
      const post = await getPost('AllPosts', postId);
      if (post) {
        setSelectedPost([{...post.data()}]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetSelectedPost();
  }, []);

  if (isLoading) return <AppLoading message="loading up..." />;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {selectedPost.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={selectedPost}
          keyExtractor={item => item.postID}
          extraData={selectedPost}
          renderItem={({item}, index) => (
            <SponsorPost
              fullScreen={true}
              onTapPost={null}
              onPush={null}
              onPressPostMenu={null}
              postImage={item.postImage}
              profileImage={item.posterAvatar}
              name={item.posterName}
              description={item.postCaption}
              date={'today :23:00pm wat'}
              // date={item.postedOn.toString()}
            ></SponsorPost>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: universalPadding / 3,
                width: '100%',
                backgroundColor: 'white',
              }}
            />
          )}
        />
      )}
      
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
