import {React, StyleSheet, View, Text} from '../imports/all_RnComponents';
import {Headline, Subheading} from '../imports/all_packages';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

export default InfoText = ({info = "information",extraStyles}) => {
  return <Headline style={[styles.balance,extraStyles]}>{info}</Headline>;
};

const styles = StyleSheet.create({
  balance: {
    color: colors.brandBg,
    fontSize: 16,
    fontFamily: brandFont.medium,
    textAlign:'center'
  },
});
