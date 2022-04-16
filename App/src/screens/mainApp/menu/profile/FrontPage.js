import {
  React,
  StyleSheet,
  View,
  Text,
  Button,
} from '../../../../imports/all_RnComponents';
import {
  LeaderBoardPane,
  AppButton,
  WinsAndGames,
  Title,
  SMHandle,
  Ig,
  Twitter,
  Fb,
  ProfileDetails,
} from '../../../../imports/all_files';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import {universalPadding, colors} from '../../../../config/config';
import {useContext} from 'react';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import ProfilePane from './../../../../components/ProfilePane';

const FrontPage = ({
  navigation,
  status = 'never have i lost any game, defeated 22games',
}) => {
  const {user} = useContext(SignUpInfoContext);

  const {
    firstName,
    lastName,
    department,
    level,
    school,
    typeOfStudent,
    gender,
    birthdate,
    profileImage,
  } = user;
  console.log(profileImage, ' front page');
  return (
    <View style={styles.container}>
      {/* <ProfileDetails
        image={profileImage}
        username={`${firstName} ${lastName}`}
        name={`${department} | ${level}Level`}
        brief={`Hi! i'm a student of ${school} university, currently in ${level}Level, my birthdate is ${birthdate} and i'm a ${gender}`}
        readOnly
        noPadding
        extraNamesWrapperStyle={styles.extraNamesWrapperStyle}
        useDarkUserName
        useDarkName
        showBorder={false}
      /> */}

      <ProfilePane dark={true} readOnly />
      <View style={styles.socialHandlerWrapper}>
        <SMHandle logo={<Ig />} handle="@afams_val" />
        <SMHandle logo={<Twitter />} handle="@afams_vasl" />
        <SMHandle logo={<Fb />} handle="@afams_val" />
      </View>
    </View>
  );
};

export default FrontPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: universalPadding / 2,
    backgroundColor: '#010101',
  },
  socialHandlerWrapper: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  extra: {
    marginBottom: 0,
    padding: 0,
    fontSize: 15,
  },
  buttonStyles: {
    margin: universalPadding / 6,
  },
});
