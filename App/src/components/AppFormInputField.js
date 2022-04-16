import React from 'react';
import {Text} from 'react-native';
import {useFormikContext} from 'formik';

import AppInput from './AppInput';

const AppFormInputField = ({label, fieldName, ...props}) => {
  const {values, setFieldTouched, errors, touched, setFieldValue} =
    useFormikContext();

  return (
    <>
      <AppInput
        label={label}
        onBlur={() => setFieldTouched(fieldName)}
        onChangeText={text => setFieldValue(fieldName, text)}
        value={values[fieldName]}
      />
      {touched[fieldName] && errors[fieldName] && (
        <Text style={{color: 'red'}}>{errors[fieldName]}</Text>
      )}
    </>
  );
};

export default AppFormInputField;
