import {
    React,
    StyleSheet,
    View,
    Text,
    FlatList,
    useState,
  } from '../../../imports/all_RnComponents';
  import {SponsorPost} from '../../../imports/all_files';
  import {universalPadding, colors} from '../../../config/config';
  import {useEffect, useContext} from 'react';
  import {AppContext} from './../../../appContext';
  import {useGetNewUser, getAllPost} from '../../../hooks/useOperation.js';
  import {getFromLocalStorage} from '../../../hooks/useLocalStorageFunctions';
  import {SignUpInfoContext} from './../../forms/signUpInfoContext';
  import firestore from '@react-native-firebase/firestore';
  import {ActivityIndicator} from 'react-native-paper';
  import AppBottomSheet from './../../../components/AppBottomSheet';
  import {SheetManager} from 'react-native-actions-sheet';
  import PostActions from './../../../components/PostActions';
  import {storeLocally} from './../../../hooks/useLocalStorageFunctions';
  
  const Home = ({navigation}) => {
    const [allPosts, setAllPost] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(true); //use this state to show a loading animation.
    const [selectedPostForAction, setSelectedPostForAction] = useState(null); //use this state to show a loading animation.
  
    const {userUID, setShowBottomTab} = useContext(AppContext);
    const {user, setUser} = useContext(SignUpInfoContext);
  
    // console.log(user,' nothing concerna m')
    const storeUpdateInfo = async updatedInfo => {
      const response = await storeLocally('currentUserBasicInfo', updatedInfo);
    };
    useEffect(() => {
      //REFACTOR THIS LATER!
  
      //i'm creating a new obj to get only the item we will store locally.
  
      //a snapshot listener that listens to this document, if it has any recent update, the call the
      console.log(userUID,' before updating')
      const subscriber = firestore()
        .collection('STUDENTS')
        .doc(userUID)
        .onSnapshot(documentSnapshot => {
          // const {
          //   birthdate,
          //   department,
          //   firstName,
          //   gender,
          //   id,
          //   lastName,
          //   level,
          //   phoneNumber,
          //   profileImage,
          //   school,
          //   typeOfStudent,
          // } = documentSnapshot.data();
  
          const updatedInfo = {
            birthdate:documentSnapshot.data().birthdate,
            department:documentSnapshot.data().department,
            firstName:documentSnapshot.data().firstName,
            gender:documentSnapshot.data().gender,
            id:documentSnapshot.data().id,
            lastName:documentSnapshot.data().lastName,
            level:documentSnapshot.data().level,
            phoneNumber:documentSnapshot.data().phoneNumber,
            profileImage:documentSnapshot.data().profileImage,
            school:documentSnapshot.data().school,
            typeOfStudent:documentSnapshot.data().typeOfStudent,
          };
  
          console.log('just got new Data and updated info', updatedInfo);
          storeUpdateInfo(updatedInfo);
          setUser(updatedInfo);
        });
  
      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [userUID]);
  
    const handleGetAllPost = async () => {
      console.log('fetching this');
      const response = await getAllPost('AllPosts');
      if (response) setAllPost(response);
    };
  
    const getCurrentUserBasicInfo = async () => {
      //daniel i think u should use netInfo to check if the internet is reachable, then based on that, decide if you want to get the basic info directly from firebase(which i prefer, cux it might hold the updated info) or from local storage,
  
      //check if it's in the local storage
  
      try {
        const response = await useGetNewUser('STUDENTS', userUID);
  
        if (response) {
          console.log(
            'got and setting the context with the new user directly from firebase...',
          );
          console.log({...response.data()}, 'good');
          return setUser({...response.data()});
        } else {
          //if its  not, then get it from firebase and store it in the local storage,
          const responseFromStorage = await getFromLocalStorage(
            'currentUserBasicInfo',
          );
  
          if (responseFromStorage) {
            console.log(
              'just go the current User Basic info from local storage, ',
              response,
            );
            setUser(responseFromStorage);
          }
        }
      } catch (error) {
        console.log('couldnt fetch basic info ', error.message);
      }
  
      //set the global sign up info context to that currentUserObject u fetched.
    };
  
    // useEffect(() => {
    //   handleGetAllPost();
    //   getCurrentUserBasicInfo();
    // }, []);
  
    useEffect(() => {
      getCurrentUserBasicInfo();
  
      //refactor this.
      const subscriber = firestore()
        .collection('AllPosts')
        .onSnapshot(querySnapshot => {
          const posts = [];
  
          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              ...documentSnapshot.data(),
            });
          });
  console.log(posts, ' heeeeeee')
          setAllPost(posts);
          setIsFetchingData(false);
        });
  
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);
  
    console.log(selectedPostForAction, ' the id opeinng');
  
    return (
      <View style={styles.container}>
        {isFetchingData && <ActivityIndicator />}
  
        <FlatList
          data={allPosts}
          keyExtractor={item => item.postID}
          renderItem={({item}, index) => (
            <SponsorPost
              onPressPostMenu={() => {
                SheetManager.show(item.postID);
              }}
              mini={false}
              postImage={item.postImage}
              profileImage={item.posterAvatar}
              name={item.posterName}
              description={item.postCaption}
              date={'today :23:00pm wat'}
              // date={item.postedOn.toString()}
            >
              <PostActions actionRef={item.postID} />
            </SponsorPost>
          )}
          ListEmptyComponent={() => <Text>finsihed</Text>}
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
      </View>
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
  