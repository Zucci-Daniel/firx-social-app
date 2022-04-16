import {React, StyleSheet, View, Text} from '../../imports/all_RnComponents';
import {
  SignUp,
  Login,
  ForgotPasswordStack,
  MainNavigation,
  QuestionScreen,
} from '../../imports/all_files';
import {Stack} from '../../navigation/create/CreateNavigation';

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////NOT IN USE!!!!!!! TO FAVOR .GROUP

const InsideApp = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="mainNavigation" component={MainNavigation} />
      <Stack.Screen name="questionScreen" component={QuestionScreen} />
    </Stack.Navigator>
  );
};

export default InsideApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
