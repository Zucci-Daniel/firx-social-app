import {
  React,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from '../imports/all_RnComponents';
import {AppInput, Ig, AppInput2} from '../imports/all_files';
import {Ionicons} from '../imports/all_packages';
import {universalPadding} from '../config/config';

export default function EditHandle({logo, handle = 'instagram'}) {
  return (
    <>
      <View style={styles.container}>
      
        <AppInput2  />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: universalPadding / 3,
  },
  logo: {
    alignSelf: 'center',
  },
});
