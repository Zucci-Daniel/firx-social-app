import {
  React,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from '../imports/all_RnComponents';
import {Headline, Subheading, CountDown, Avatar} from '../imports/all_packages';
import {
  AppButton,
  AppHeading,
  Link,
  AppImage,
  AppBottomSheet,
  ProfilePane,
} from '../imports/all_files';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
  height,
} from '../config/config';
import {Touchable} from 'react-native';
import {useToggleSheet} from '../hooks/useToggleSheet';

export default TopWinners = ({onPress, children}) => {
  const {sheet, toggleBottomSheet, hideBottomSheet} = useToggleSheet();

  return (
    <>
      <Link
        onPress={onPress}
        text={'recent winners'}
        extraStyle={styles.text}
      />
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {children}
      </TouchableOpacity>
      {/* <AppBottomSheet
        onPullDown={hideBottomSheet}
        customSheetRef={sheet}
        height={height - 200}
        useDefaultExperience={false}>
        <View
          style={{
            backgroundColor: colors.pureWhite,
            flex: 1,
          }}>
          <ProfilePane
            useDarkUserName
            useDarkName
            showBorder
            showWinsAndGame
            readOnly
          />
          <ProfilePane
            useDarkUserName
            useDarkName
            showBorder
            showWinsAndGame
            readOnly
          />
          <ProfilePane
            useDarkUserName
            useDarkName
            showBorder
            showWinsAndGame
            readOnly
          />
          <ProfilePane
            useDarkUserName
            useDarkName
            showBorder
            showWinsAndGame
            readOnly
          />
        </View>
      </AppBottomSheet> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    color: 'gray',
  },
});
