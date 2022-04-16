import {
  React,
  StyleSheet,
  View,
  Text,
  FlatList,
  useState,
} from '../imports/all_RnComponents';
import {Subheading} from '../imports/all_packages';
import {AppCheckBox as OptionCheckBox} from '../imports/all_files';
import {universalPadding, width} from '../config/config';

export default SingleQuestion = ({
  question = 'question',
  options = ['option1', 'option2'],
  optionSelected,
  readOnly = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = item => {
    setSelectedOption(item);
    console.log('you selected ', item);
    optionSelected && optionSelected(item);
  };

  return (
    <View style={styles.container}>
      <Subheading style={styles.question}>{question}?</Subheading>
        <FlatList
          data={options}
          keyExtractor={index => index}
          renderItem={({item}, index) => (
            <OptionCheckBox
              selected={selectedOption === item ? true : false}
              key={item}
              label={item}
              onPress={() => handleSelection(item)}
            />
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: universalPadding,
    minWidth: width - 100,
  },
  question: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: universalPadding / 3,
    textAlign: 'center',
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    transform: [{scale: 0.6}],
  },
});
