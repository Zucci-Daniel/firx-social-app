import React from 'react';
import {Text} from 'react-native';
import {useFormikContext} from 'formik';

import {RadioButton} from 'react-native-paper';

const AppFormRadioField = ({fieldName, children,...props}) => {
  const {values, setFieldTouched, errors, touched, setFieldValue} =
    useFormikContext();

  return (
    <>
      <RadioButton.Group
        onValueChange={value => setFieldValue(fieldName, value)}
        value={values[fieldName]}
        name={fieldName}
        color="green"
        style={{flexDirection: 'row'}}
        {...props}
        >
        {children}
      </RadioButton.Group>

      {touched[fieldName] && errors[fieldName] && (
        <Text style={{color: 'red'}}>{errors[fieldName]}</Text>
      )}
    </>
  );
};

export default AppFormRadioField;
