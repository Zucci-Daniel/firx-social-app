import React from 'react';
import {Text} from 'react-native';
import {useFormikContext} from 'formik';

import AppMultiSelect from './AppMultiSelect';

const AppFormSelectField = ({fieldName, data}) => {
  const {values, setFieldTouched, errors, touched, setFieldValue} =
    useFormikContext();

  return (
    <>
      <AppMultiSelect
        name={fieldName}
        data={data}
        value={values[fieldName]}
        onBlur={() => setFieldTouched(fieldName)}
        onChange={selectedItem =>
          setFieldValue(fieldName, selectedItem['value'])
        }
      />

      {touched[fieldName] && errors[fieldName] && (
        <Text style={{color: 'red'}}>{errors[fieldName]}</Text>
      )}
    </>
  );
};

export default AppFormSelectField;
