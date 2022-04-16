import {
    React,
    StyleSheet,
    View,
    Text,
    FlatList,
    useState,
  } from '../../../imports/all_RnComponents';
  import {commonFunctions, SponsorPost} from '../../../imports/all_files';
  import {universalPadding, colors} from '../../../config/config';
  import {useEffect, useContext} from 'react';
  import {AppContext} from './../../../appContext';
  import {useGetNewUser} from '../../../hooks/useOperation.js';
  import {getFromLocalStorage} from '../../../hooks/useLocalStorageFunctions';
  import {SignUpInfoContext} from './../../forms/signUpInfoContext';
  import firestore from '@react-native-firebase/firestore';
  import {SheetManager} from 'react-native-actions-sheet';
  import PostActions from './../../../components/PostActions';
  import {storeLocally} from './../../../hooks/useLocalStorageFunctions';
  import {log} from './../../../hooks/testLog';
  import AppLoading from './../../../components/AppLoading';
  import {
    handleUnfollowAuthor,
    handleSavePost,
    confirmAction,
    handleDeletePost,
    handleStopSeeingPost,
  } from '../../../hooks/postOperations';
  import AppFloatMenu from '../../../components/AppFloatMenu';
  
  let allPosts = [];
  
  const Home = ({navigation}) => {
    const page = 'home';
  
    // const [allPosts, setAllPost] = useState([]);
    const [blackLists, setBlackLists] = useState({
      myPostsBlackList: [],
      myProfilesBlackList: [],
    });
    const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.
  
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
      getCurrentUserBasicInfo();
  
      //get the snapShot of his saved posts from his doc
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
  
    console.log(
      'profiles blacklisted from the outside, ',
      blackLists.myProfilesBlackList,
    );
  
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
          if (
            blackLists.myProfilesBlackList
              ? blackLists.myProfilesBlackList.includes(
                  documentSnapshot.data().posterUserUID,
                ) == false
              : true
          ) {
            console.log(
              documentSnapshot.data().posterName,
              documentSnapshot.data().posterUserUID,
              ' nother there',
            );
            posts.push({
              ...documentSnapshot.data(),
            });
          } else {
            console.log(
              documentSnapshot.data().posterName,
              documentSnapshot.data().posterUserUID,
              ' it is there',
            );
          }
        });
        allPosts = posts;
        setIsFetchingData(false);
      });
  
      console.log('es');
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, [blackLists.myPostsBlackList, blackLists.myProfilesBlackList]);
  
    const handleRepost = (postID, postImage, postCaption) => {
      hideSheet(postID);
      navigation.navigate('createPost', {
        repostID: postID,
        repostImage: postImage,
        repostCaption: postCaption,
      });
    };
  
    if (isFetchingData) return <AppLoading message="getting feeds for you..." />;
  
    const _respost = (postID, postImage, postCaption) => {
      hideSheet(postID);
      handleRepost(postID, postImage, postCaption);
    };
  
    const _deletePost = (postID, deleteAction) => {
      hideSheet(postID);
      confirmAction(postID, deleteAction);
    };
    const _savePost = (postID, userUID) => {
      hideSheet(postID);
      handleSavePost(postID, userUID);
    };
    const _unFollow = (posterUID, userUID, posterName) => {
      hideSheet(posterUID);
      handleUnfollowAuthor(posterUID, userUID, posterName);
    };
    const _stopSeeingThis = (postID, userUID) => {
      hideSheet(postID);
      handleStopSeeingPost(postID, userUID);
    };
  
    const hideSheet = id => SheetManager.hide(id);
  
    return (
      <>
        <View style={styles.container}>
          {allPosts.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allPosts}
              keyExtractor={item => item.postID}
              renderItem={({item}, index) => {
                return (
                  <SponsorPost
                    onTapPost={() =>
                      navigation.navigate('viewPost', {postId: item.postID})
                    }
                    postMedias={item.postMedias}
                    onPush={() => null} //use transaction for this.
                    onPressPostMenu={() => SheetManager.show(item.postID)}
                    mini={false}
                    profileImage={item.posterAvatar}
                    name={item.posterName}
                    description={item.postCaption}
                    date={'today :23:00pm wat'}
  
                    // pushValue={item.postPushes.length}
                  >
                    <PostActions
                      iAuthoredThis={item.posterUserUID == userUID}
                      actionRef={item.postID}
                      onRepost={() =>
                        _respost(item.postID, item.postImage, item.postCaption)
                      }
                      deletePost={() =>
                        _deletePost(item.postID, handleDeletePost)
                      }
                      onSavePost={() => _savePost(item.postID, userUID)}
                      onUnfollow={() =>
                        _unFollow(item.posterUserUID, userUID, item.posterName)
                      }
                      onStopSeeingThis={() =>
                        _stopSeeingThis(item.postID, userUID)
                      }
                    />
                  </SponsorPost>
                );
              }}
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
            <AppLoading message="oops no post available" />
          )}
        </View>
        <AppFloatMenu onPressButton={name => navigation.navigate(name)} />
      </>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.pureWhite,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      padding: universalPadding / 6,
      textAlign: 'center',
      fontSize: 14,
    },
  });
  