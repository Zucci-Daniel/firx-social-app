import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';

import {RadioButton} from 'react-native-paper';

const AppRadioField = ({control, name, required = {},children}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <RadioButton.Group
            onValueChange={value => onChange(value)}
            value={value}
            color="green"
            style={{flexDirection: 'row'}}>
            {children}
          </RadioButton.Group>
        </>
      )}
    />
  );
};

export default AppRadioField;
