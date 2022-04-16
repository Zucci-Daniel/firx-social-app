import React from 'react';

import {universalPadding, width, sMargin, colors} from '../config/config';
import {View, StyleSheet} from 'react-native';
import Google from './icons/Google';
import Fb from './icons/Fb';
import Phone from './icons/Phone';

export default Alternatives = ({onPressFb, onPressGoogle, onPressPhone}) => {
  return (
    <View style={styles.alternatives}>
      <Fb onPress={onPressFb} />
      <Google onPress={onPressGoogle} />
      <Phone onPress={onPressPhone} />
    </View>
  );
};

const styles = StyleSheet.create({
  alternatives: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '70%',
    justifyContent: 'space-around',
    marginBottom: universalPadding / 4,
  },
});
