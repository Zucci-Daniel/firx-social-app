import {useEffect, useState, React} from 'react';
import {View, StyleSheet} from 'react-native';
import Link from './Link';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

export default AppAccordion = ({
  answers,
  question = 'How to win the game',
  shouldExpand = false,
  onPress,
  questionColor = colors.brandBg,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      expanded={onPress ? shouldExpand : expanded}
      title={question}
      onPress={onPress ? onPress : handlePress}
      titleStyle={[styles.titleStyle, {color: questionColor}]}>
      <View style={{padding: universalPadding / 5}}>{answers}</View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    borderRadius: 5,
    fontFamily: brandFont.medium,
    marginVertical: 10,
  },
});
