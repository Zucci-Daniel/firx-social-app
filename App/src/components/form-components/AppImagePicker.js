import React from 'react';
import {View, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import AppImage from './../AppImage';

const AppImagePicker = ({control, name, required = {}, data, placeholder}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={required}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <AppImage
            size={150}
            theImage={image => {
              console.log(image, ' the image');
              onChange(image);
            }}
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

export default AppImagePicker;
