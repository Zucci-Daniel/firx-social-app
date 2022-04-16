import {
  React,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from '../imports/all_RnComponents';
import {Headline, Subheading, CountDown, Avatar} from '../imports/all_packages';
import {AppButton, AppHeading, Link, AppImage} from '../imports/all_files';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';
import {Touchable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default PostPreview = ({onFinish, children}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.wrapper}>
        <Link
          text={'top sponsors'}
          extraStyle={styles.sponsors}

        />
        <Link
          text={'see all'}
          readOnly
          extraStyle={[styles.seeAll, {padding: 0, marginHorizontal: 0}]}
          onPress={() => navigation.navigate('sponsors')}
        />
      </View>
      <View style={styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sponsors: {
    fontSize: 10,
    color: 'gray',
    padding: 0,
    marginHorizontal: 0,
  },
  text: {
    color: '#ccc',
  },
  seeAll: {
    textDecorationLine: 'underline',
  },
});
