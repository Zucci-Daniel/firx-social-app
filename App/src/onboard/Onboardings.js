import {React,Image,Dimensions,StyleSheet} from '../imports/all_RnComponents';
import { Onboarding } from '../imports/all_packages';
import { useNavigation } from '@react-navigation/native';


const Onboardings = ({}) => {
  const navigation = useNavigation()
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: 'white',
          image: (
            <Image
              source={require('../assets/question.jpg')}
              style={{
                height: Dimensions.get('screen').height / 2,
                width: Dimensions.get('screen').width / 1.1,
              }}
            />
          ),
          title: 'JUST ANSWER QUESTIONS',
          subtitle: 'an then....',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/money.png')}
              style={{
                height: Dimensions.get('screen').height / 2,
                width: Dimensions.get('screen').width / 1.1,
              }}
            />
          ),
          title: 'WIN THE PRIZE!!',
          subtitle: 'simple, easy and fair!',
        },
      ]}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      onDone={() => navigation.navigate('register')}
      nextLabel={'Continue'}
      showSkip={false}
    />
  );
};

export default Onboardings;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subtitle: {
    fontSize: 20,
  },
});
