import {React} from '../../../../imports/all_RnComponents';
import {FrontPage, EditProfile} from '../../../../imports/all_files';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import ButtonText from './../../../../components/ButtonText';

const Profile = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        presentation: 'modal',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="frontPage"
        component={FrontPage}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#010101'},
          headerRight: () => (
            <ButtonText
              bg="cadetblue"
              title="edit profile"
              onPress={() => navigation.navigate('editProfile')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
