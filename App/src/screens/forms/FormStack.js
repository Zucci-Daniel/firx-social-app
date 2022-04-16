import React, {useContext} from 'react';
import {View} from 'react-native';
import {Stack} from '../../navigation/create/CreateNavigation';
import FormSection1 from './FormSection1';
import FormSection2 from './FormSection2';
import FormSection3 from './FormSection3';
import FormSection4 from './FormSection4';
import Welcome from './Welcome';
import {SignUpInfoContext} from './signUpInfoContext';
import {useNavigation} from '@react-navigation/native';
import {useForm, FormProvider} from 'react-hook-form';

const FormStack = () => {
  const methods = useForm({
    defaultValues: {
      birthdate: '',
      gender: '',
      firstName: '',
      lastName: '',
      typeOfStudent: '',
      school: '',
      department: '',
      level: '',
      profileImage: null,
      phoneNumber: '',
    },
    mode: 'all',
    shouldUnregister: false,
  });

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{animation: 'slide_from_right', headerShown: false}}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="formSection1" component={FormSection1} />
        <Stack.Screen name="formSection2" component={FormSection2} />
        <Stack.Screen name="formSection3" component={FormSection3} />
        <Stack.Screen name="formSection4" component={FormSection4} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default FormStack;
