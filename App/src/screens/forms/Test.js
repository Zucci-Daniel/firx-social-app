import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import AppButton from '../../components/AppButton';
import AppInputField from './../../components/form-components/AppInputField';
//TESTING REACT HOOKS FORM
const Test = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: 'solo',
      lastName: 'tommy',
    },
  });

  const submit = data => {
    console.log(data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#010101',
        padding: 20,
      }}>
      <AppInputField
        control={control}
        name="firstName"
        label={'first name'}
        required={{
          required: 'fill this f** field MF!!',
          minLength: {value: 4, message: 'must be more than 4'},
        }}
      />
      <AppInputField
        control={control}
        name="lastName"
        label={'lastName name'}
        required={{required: 'fill this f** field MF!!'}}
      />

      <AppButton wideButton onPress={handleSubmit(submit)} title="submit" />
    </View>
  );
};

export default Test;
