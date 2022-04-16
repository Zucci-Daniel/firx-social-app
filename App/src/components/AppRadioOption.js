import React from 'react';
import {RadioButton} from 'react-native-paper';

const AppRadioOption = ({value}) => {
  return (
    <RadioButton.Item
      uncheckedColor="gray"
      label={value}
      value={value}
      labelStyle={{color: 'white'}}
    />
  );
};

export default AppRadioOption;
