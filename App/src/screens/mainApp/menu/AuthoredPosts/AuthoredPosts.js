import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text} from 'react-native';
import {colors, universalPadding, width} from '../../../../config/config';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from './../../../../appContext';
import SponsorPost from './../../../../components/SponsorPost';
import {commonFunctions} from '../../../../imports/all_files';
import AppLoading from './../../../../components/AppLoading';
import Link from './../../../../components/Link';
import {useNavigation} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import {
  handleDeletePost,
  handleUnfollowAuthor,
} from '../../../../hooks/postOperations';
import {
  handleSavePost,
  confirmAction,
} from './../../../../hooks/postOperations';
import PostActions from '../../../../components/PostActions';
///use a flast list

const AuthoredPosts = () => {
  const navigation = useNavigation();
  const [authoredPosts, setAuthoredPosts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.

  const {userUID} = useContext(AppContext);

  useEffect(() => {
    try {
      firestore()
        .collection('AllPosts')
        .where('posterUserUID', '==', userUID)
        .onSnapshot(querySnapshot => {
          let post = [];
          querySnapshot.forEach(postSnapShot => {
            post.push({...postSnapShot.data()});
          });
          setAuthoredPosts(post);
          setIsFetchingData(false);
        });
    } catch (error) {
      commonFunctions.showToast(
        'failed to get your posts.',
        error.message,
        'error',
      );
    }

    return () => {};
  }, []);

  const _deletePost = (postID, deleteAction) => {
    hideSheet();
    confirmAction(postID, deleteAction);
  };

  const hideSheet = id => SheetManager.hideAll();

  if (isFetchingData) return <AppLoading />;

  return (
    <View style={styles.container}>
      {authoredPosts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={authoredPosts}
          keyExtractor={item => item.postID}
          renderItem={({item}, index) => (
            <SponsorPost
              onTapPost={() =>
                navigation.navigate('viewPost', {postId: item.postID})
              }
              onPressPostMenu={() => {
                SheetManager.show(item.postID);
              }}
              mini={false}
              postMedias={item.postMedias}
              profileImage={item.posterAvatar}
              name={item.posterName}
              description={item.postCaption}
              date={'today :23:00pm wat'}
              pushValue={item.postPushes.length}
              // date={item.postedOn.toString()}
            >
              <PostActions
                actionRef={item.postID}
                iAuthoredThis={true}
                deletePost={() => _deletePost(item.postID, handleDeletePost)}
              />
            </SponsorPost>
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
      ) : (
        <Link
          text={'no recent post yet, create a post'}
          onPress={() => navigation.navigate('createPost')}
        />
      )}
    </View>
  );
};

export default AuthoredPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pureWhite,
    width: width,
    justifyContent: 'center',
  },
});
