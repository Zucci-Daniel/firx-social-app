import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';

const AppInputField = ({control, name, label, required = {}}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({
        field: {value, onChange, onBlur},
        fieldState: {error},
      }) => (
        <>
          <AppInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
          />
          {error && (
            <Text style={{color: error ? 'red' : 'green'}}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default AppInputField;
