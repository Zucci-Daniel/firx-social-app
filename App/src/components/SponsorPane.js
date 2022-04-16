import {
  React,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from '../imports/all_RnComponents';
import {Subheading} from '../imports/all_packages';
// import {} from '../imports/all_files';
import {universalPadding, colors, height} from '../config/config';

export default SponsorPane = ({
  source = require('../assets/1.jpg'),
  company = 'Jumia',
  desc = 'Lorem ipsum dolor sit amet conss ewer red resd ewe elit.',
  onPressAd,
  mini = true,
  number = 1,
}) => {
  return (
    <TouchableOpacity activeOpacity={mini ? 0.9 : 1} onPress={onPressAd}>
      {mini && (
        <View style={[styles.mini]}>
          <View style={styles.image}>
            <Image source={source} style={styles.img} />
          </View>
          <View style={styles.description}>
            <Subheading style={styles.company}>{company}</Subheading>
            <Subheading style={styles.brief}>{desc}</Subheading>
          </View>
        </View>
      )}
      {/* // when u click on a sponsors preview pane, then it more big and readable */}
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mini: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.brandColor,
    borderBottomWidth: StyleSheet.hairlineWidth / 2,
    borderColor: colors.fadeWhite,
  },
  image: {
    height: 100,
    width: '25%',
    backgroundColor: 'transparent',
  },
  description: {
    width: '70%',
    backgroundColor: 'transparent',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  company: {
    fontWeight: 'bold',
    color: colors.hairLineColor,
    textTransform: 'capitalize',
  },
  brief: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.placeHolder,
  },
  ///maxi
  maxi: {
    width: '100%',
    height: height / 1.3,
    backgroundColor: colors.pureWhite,
    // marginBottom: universalPadding / 3,
    // position: 'relative',
    borderBottomWidth:0,
    borderColor: colors.fadeWhite,
    borderRadius: 5,
    overflow: 'hidden',
  },
  // maxDescription: {maxHeight: '15%', padding: 5},
  maxImage: {
    height: '70%',
    width: '100%',
  },
  maxCompany: {
    height: '10%',
    padding:universalPadding/3,
    fontWeight: 'bold',
    color: colors.hairLineColor,
    fontSize: 25,
    textTransform: 'uppercase',
    textAlign: 'justify',
    // marginVertical: 5,
  },
  maxBrief: {
    textAlign: 'justify',
    height: '15%',
    padding: 5,
  },
});
