import {
  React,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from '../imports/all_RnComponents';
import {universalPadding} from '../config/config';

export default function SMHandle({logo, handle = 'instagram'}) {
  return (
    <>
      <TouchableOpacity
        style={styles.SMHandle}
        onPress={() =>
          alert('about to leave this app, click to proceed to instagram')
        }>
        <View style={styles.logo}>{logo}</View>
        {/* <Text style={styles.handle}>{handle}</Text> */}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  SMHandle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: universalPadding / 4,
  },
  handle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'black',
    textTransform: 'capitalize',
  },
});
