import {React} from '../../imports/all_RnComponents';
import {Confirmation, Register} from '../../imports/all_files';
import {Stack} from '../../navigation/create/CreateNavigation';
import FormStack from './../forms/FormStack';

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="confirmation" component={Confirmation} />
      <Stack.Screen name="formStack" component={FormStack} />
    </Stack.Navigator>
  );
};

export default Auth;
