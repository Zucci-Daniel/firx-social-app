import {
  React,
  StyleSheet,
  View,
  Text,
  Button,
} from '../imports/all_RnComponents';
import {Headline, Subheading, Badge} from '../imports/all_packages';
import {
  LeaderBoardPane,
  ProfilePane,
  AppButton,
  WinsAndGames,
  Title,
  SMHandle,
  Ig,
  Twitter,
  Fb,
  ProfileDetails,
} from '../imports/all_files';
import {universalPadding, width, sMargin, colors} from '../config/config';

const WinnerCard = ({
  navigation,
  status = 'never have i lost any game, defeated 22games',
}) => {
  return (
    <View style={styles.container}>
      <ProfileDetails
        readOnly
        noPadding
        extraNamesWrapperStyle={styles.extraNamesWrapperStyle}
        useDarkUserName
        useDarkName
        showBorder={false}
        name={status}
      />

      <WinsAndGames />

      <View style={styles.socialHandlerWrapper}>
        <Title Title={`SOCIAL HANDLERS lol`} extraTitleStyle={styles.extra} />

        <SMHandle logo={<Ig />} handle="@Winner" />
        <SMHandle logo={<Twitter />} handle="@afams_vasl" />
        <SMHandle logo={<Fb />} handle="@Winner" />
      </View>
    </View>
  );
};

export default WinnerCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: universalPadding / 2,
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
  },
  socialHandlerWrapper: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
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
