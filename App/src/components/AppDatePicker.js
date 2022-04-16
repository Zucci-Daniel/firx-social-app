import React, {useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icons from 'react-native-vector-icons/FontAwesome';

const AppDatePicker = ({getDate}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateColor, setDateColor] = useState('gray');
  const [useThisDate, setuseThisDate] = useState({
    theMonth: '',
    theDay: '',
    theYear: '',
  });

  const getTheDate = selectedDate => {
    setOpen(false);
    setDate(selectedDate);
    let splitedDate = selectedDate.toString();
    let pushDateToArray = splitedDate.split(' ');
    pushDateToArray.splice(4);
    pushDateToArray.shift();
    let [theMonth, theDay, theYear] = pushDateToArray;

    setuseThisDate({
      theMonth,
      theDay,
      theYear,
    });

    return `${theMonth}/${theDay}/${theYear}`
  };

  return (
    <>
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={[styles.dateColor, {color: dateColor}]}>
            {useThisDate.theMonth == ''
              ? `Add your birth date`
              : `${useThisDate.theMonth}/${useThisDate.theDay}/${useThisDate.theYear}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Icons name="calendar" size={30} color={'green'} />
        </TouchableOpacity>
      </View>

      <DatePicker
        textColor={'black'}
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
       const formatDate = getTheDate(date);
          setDateColor('white');
          getDate(formatDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomColor:config.colors.placeholderColor,
    borderBottomColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: 40,
  },
  dateColor: {
    fontSize: 20,
  },
});
