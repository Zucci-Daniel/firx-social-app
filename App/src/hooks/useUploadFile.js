import {useState, useContext} from 'react';
import {Alert} from 'react-native';

import storage from '@react-native-firebase/storage';
import {SignUpInfoContext} from './../screens/forms/signUpInfoContext';
import {showToast} from '../functions/commonFunctions';

export const useUploadFile = imageUri => {
  // const {user, setUser} = useContext(SignUpInfoContext);
  const [transfered, settransfered] = useState(null);
  const [loading, setloading] = useState(null);

  const uploadFile = async imageUri => {
    const uploadUri = imageUri;
    // console.log(uploadUri, ' uploadUri');
    const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // console.log(filename, ' the filename');
    setloading(true);
    settransfered(0);
    const storageRef = storage().ref(`media/${filename}`);
    // console.log('the fucking storage ', storageRef);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      // setUser({
      //   ...user,
      //   transferring:
      //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
      //     100,
      // });
    });

    //dan look into this function, it's doing more than it should, WTF!! will this tell the user that account has been created?
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      console.log(`this is your fxxx download url  ${url}`);
      setloading(false);
      settransfered(null);
      // console.log('seting url to state');
      return url;
    } catch (error) {
      console.log(error);
      showToast('Failed', error.message, 'ERROR');

      return null;
    }
  };

  return uploadFile;
};
