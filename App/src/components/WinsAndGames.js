import {React, StyleSheet, View, Text} from '../imports/all_RnComponents';
import {Headline, Subheading} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default WinsAndGames = ({
  wins = 22,
  games = 51,
  extraStyles,
  extraWinStyles,
  extraGameStyles,
}) => {
  return (
    <Text style={[styles.text, extraStyles]}>
      <Text style={[styles.score, extraWinStyles]}>{wins}</Text>wins/
      <Text style={[styles.score, extraGameStyles]}>{games}</Text>games
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding,
    alignItems: 'center',
  },

  text: {color: colors.brandBg, fontSize: 16},
  score: {color: colors.brandBg, fontSize: 25, fontWeight: '900'},
});
