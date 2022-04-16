import {
  React,
  StyleSheet,
  View,
  Text,
  useState,
} from '../../../imports/all_RnComponents';

import {ScrollView} from 'react-native';

import {commonFunctions} from '../../../imports/all_files';
import {
  universalPadding,
  colors,
  width,
  height,
  postSize,
} from '../../../config/config';
import {useEffect, useContext} from 'react';
import {AppContext} from './../../../appContext';
import {useGetNewUser} from '../../../hooks/useOperation.js';
import {getFromLocalStorage} from '../../../hooks/useLocalStorageFunctions';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {storeLocally} from './../../../hooks/useLocalStorageFunctions';
import {log} from './../../../hooks/testLog';
import AppLoading from './../../../components/AppLoading';
// import {
//   handleUnfollowAuthor,
//   handleSavePost,
//   confirmAction,
//   handleDeletePost,
//   handleStopSeeingPost,
// } from '../../../hooks/postOperations';
import AppFloatMenu from '../../../components/AppFloatMenu';
import Feed from './../../../components/Feed';
import {toggleNetwork} from './../../../hooks/useOperation';
import AppPostVideo from './../../../components/AppPostVideo';

const Home = ({navigation}) => {
  const test = async () => {
    try {
      const response = await firestore()
        .collection('STUDENTS')
        .doc('yE8vmOWuJ6VJot7L7OwxtBNdgjs1')
        .get();

      if (response) {
        console.log('got the file, ===> ', response);
      } else {
        console.log('just response, ===> ', response);
      }
    } catch (error) {
      console.warn('error getin custom files => ', error.message);
    }
  };

  useEffect(() => {
    test();
  }, []);

  toggleNetwork();

  const page = 'home';

  const [allPosts, setAllPost] = useState([]);
  const [blackLists, setBlackLists] = useState({
    myPostsBlackList: [],
    myProfilesBlackList: [],
  });
  const [isFetchingData, setIsFetchingData] = useState(!true); //use this state to show a loading animation.

  const {userUID} = useContext(AppContext);
  const {setUser} = useContext(SignUpInfoContext);

  const getCurrentUserBasicInfo = async (id = userUID) => {
    try {
      //try any of the options to get the basic user info
      //later, use the netInfo to detect where to get the basic info from, either locally or firestore directly.

      try {
        log('going to get user basic info from firestore. ...', page, id);
        const response = await useGetNewUser('STUDENTS', id); //find out why u are converting id.

        if (response) {
          //prepare the data. because u don't want to store every user from the db to the local storage, we're basically taking what we want.
          const responseObj = {...response.data()};

          // console.log(responseObj, ' response obj');

          const userBasicInfo = {
            birthdate: responseObj.birthdate,
            gender: responseObj.gender,
            firstName: responseObj.firstName,
            lastName: responseObj.lastName,
            typeOfStudent: responseObj.typeOfStudent,
            school: responseObj.school,

            department: responseObj.department,
            level: responseObj.level,
            profileImage: responseObj.profileImage,
            phoneNumber: responseObj.phoneNumber,
          };
          console.log(userBasicInfo.profileImage, ' my profile image');
          try {
            //store the basic info
            await storeLocally('currentUserBasicInfo', userBasicInfo);
            return setUser(userBasicInfo);
          } catch (error) {
            log(' faild to store response locally', page, error.message);
          }

          console.log(userBasicInfo, ' the userBasicInfo');

          // return setUser(userBasicInfo);
        } else {
          log('failed to get user info from firebase ', page);
        }
      } catch (error) {
        log(
          `couldn't get basic info from firestore ${error.message}, ==> fetching locally`,
          page,
        );
        //
        const responseFromStorage = await getFromLocalStorage(
          'currentUserBasicInfo',
        );

        if (responseFromStorage) {
          commonFunctions.showToast(
            'operation successful',
            `got basic info locally , setting user context `,
            'SUCCESS',
          );
          setUser(responseFromStorage);
        } else {
          commonFunctions.showToast(
            'operation failed',
            `could'nt get basic info locally`,
            'ERROR',
          );
        }
      }
    } catch (error) {
      commonFunctions.showToast(
        'operation failed',
        `couldn't get basic info from firestore or locally ${error.message}`,
        'WARNING',
      );
    }

    //set the global sign up info context to that currentUserObject u fetched.
  };

  useEffect(() => {
    console.log('getting current user specially');
    getCurrentUserBasicInfo();
  }, [false]);

  console.log(allPosts, ' from hom');
  // /RE WRITE THIS FUNCTION SO IT WONT GIVE ERROR
  useEffect(() => {
    //get the snapShot of his black listed posts from his doc
    const subscriber = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapshot => {
        setBlackLists({
          ...blackLists,
          myPostsBlackList: documentSnapshot.data().postsBlackListed,
          myProfilesBlackList: documentSnapshot.data().profilesBlackListed,
        });
        console.log(
          documentSnapshot.data().profilesBlackListed,
          ' blacklisted profiles',
        );
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const baseUrl = firestore().collection('AllPosts');
    const postCondition =
      blackLists.myPostsBlackList.length > 0
        ? baseUrl.where('postID', 'not-in', blackLists.myPostsBlackList)
        : baseUrl;

    //get the post.
    //refactor this.
    const subscriber = postCondition.onSnapshot(querySnapshot => {
      const posts = [];

      querySnapshot.forEach(documentSnapshot => {
        //think about this again.
        if (
          blackLists.myProfilesBlackList
            ? blackLists.myProfilesBlackList.includes(
                documentSnapshot.data().posterUserUID,
              ) == false
            : true
        ) {
          posts.push({
            ...documentSnapshot.data(),
          });
        } else {
        }
      });

      setAllPost(posts);

      setIsFetchingData(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

 
  if (isFetchingData) return <AppLoading message="getting feeds for you..." />;

  console.log(allPosts, ' the feeds');

  return (
    <>
      <View style={styles.container}>
        <Feed useData={allPosts} userUID={userUID} />
      </View>
      <AppFloatMenu onPressButton={name => navigation.navigate(name)} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: undefined,
    width: width,
    backgroundColor: colors.pureWhite,
    justifyContent: 'center',
  },
  heading: {
    padding: universalPadding / 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
