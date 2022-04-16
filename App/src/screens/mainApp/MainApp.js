import {React} from '../../imports/all_RnComponents';
import {MainNavigation} from '../../imports/all_files';
import { Stack } from '../../navigation/create/CreateNavigation';


const MainApp = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="mainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default MainApp;
