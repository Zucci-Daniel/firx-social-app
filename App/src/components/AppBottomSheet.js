import React from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {height} from '../config/config';

const AppBottomSheet = ({
  sheetID = new Date(),
  children,
  sheetHieght = 200,
}) => {
  return (
    <ActionSheet
      id={sheetID}
      defaultOverlayOpacity={0.8}
      overlayColor="black"
      openAnimationSpeed={20}>
      <View style={[styles.content, {height: sheetHieght}]}>{children}</View>
    </ActionSheet>
  );
};

export default AppBottomSheet;
const styles = StyleSheet.create({
  content: {width: '100%', backgroundColor: '#010', padding: 0, margin: 0},
});
