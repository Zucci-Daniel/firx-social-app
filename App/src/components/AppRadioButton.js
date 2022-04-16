import {React, StyleSheet, View} from '../imports/all_RnComponents';
import {RadioButton} from '../imports/all_packages';
import {colors, sMargin, inputBorder} from '../config/config';

export default AppRadioButton = ({label = 'Bank Transfer', color = 'red'}) => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={styles.wrapper}>
      <RadioButton.Item
        label={label}
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
        color={color}
        uncheckedColor={'#fff'}
        color={'black'}
        mode="android"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    padding: 0,
  },
  TextInput: {},
});
