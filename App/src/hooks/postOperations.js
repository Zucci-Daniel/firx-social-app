import {Alert} from 'react-native';
import {commonFunctions} from '../imports/all_files';
import firestore from '@react-native-firebase/firestore';
import {addToArray} from './useOperation';

export const confirmAction = (
  id,
  yes,
  no,
  messageTitle = 'POST WILL BE DELETED FOREVER!',
  message = 'you wann delete this anyways?',
  positive = 'Delete anyways',
  negative = 'cancel',
) => {
  Alert.alert(messageTitle, message, [
    {
      text: negative,
      onPress: null,
      style: 'cancel',
    },
    // {text: positive, onPress: yes},
    {text: positive, onPress: () => yes(id)},
  ]);
};

export const handleDeletePost = id => {
  firestore()
    .collection('AllPosts')
    .doc(id)
    .delete()
    .then(() => {
      //remove it from ur array of posted items
      commonFunctions.showToast(null, 'Post deleted', 'alert');
    })
    .catch(error =>
      commonFunctions.showToast(
        '',
        "can't delete post, try again later",
        'error',
      ),
    );
};

export const handleSavePost = (id, to) => {
  addToArray('STUDENTS', to, id, 'postsSaved');
};

export const handleUnfollowAuthor = (id, to, unfollowedAuthor) => {
  try {
    addToArray('STUDENTS', to, id, 'profilesBlackListed');
    commonFunctions.showToast(
      '',
      `you've just unfollowed ${unfollowedAuthor}`,
      'alert',
    );
  } catch (error) {
    commonFunctions.showToast(
      '',
      `failed to unfollowed ${unfollowedAuthor}`,
      'error',
    );
  }
};
export const handleStopSeeingPost = (id, to) => {
  try {
    addToArray('STUDENTS', to, id, 'postsBlackListed');
    commonFunctions.showToast('', `done`, 'alert');
  } catch (error) {
    commonFunctions.showToast('', `failed`, 'error');
  }
};
