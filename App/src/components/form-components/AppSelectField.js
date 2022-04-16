import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppMultiSelect from '../AppMultiSelect';

const AppSelectField = ({control, name, required = {}, data,placeholder}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppMultiSelect
          placeholder={placeholder}
            data={data}
            value={value}
            onBlur={onBlur}
            onChange={selectedItem => onChange(selectedItem['value'])}
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

export default AppSelectField;
