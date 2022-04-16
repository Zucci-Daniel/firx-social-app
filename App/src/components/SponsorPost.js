/////////////////////NOT IN USE///////////////////////

import {
  React,
  StyleSheet,
  View,
  Image as RenamedImage,
} from '../imports/all_RnComponents';
import {useRef, memo} from 'react';
import {Subheading, MaterialIcons} from '../imports/all_packages';
import ProgressBar from 'react-native-progress/Bar';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
// import {} from '../imports/all_files';
import {
  universalPadding,
  colors,
  height,
  width,
  menuIconSize,
} from '../config/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostActionIcon from './PostActionIcon';
import TopFigure from './TopFigure';
import {Pressable, TouchableOpacity, Text} from 'react-native';
import Image from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Bar';
import AppLoading from './AppLoading';
import AppCarousel from './AppCarousel';

const postHeight = height / 1.7;
const postHeightFull = height / 1.3;

const SponsorPost = ({
  profileImage,
  postMedias = [
    {media: null, type: 'video'},
    {media: null, type: 'picture'},
    {media: null, type: 'picture'},
    {media: null, type: 'video'},
    {media: null, type: 'picture'},
  ],
  name = 'Jumia',
  description = 'eeLorem ipsum dolor sit amet conss ewer red resd ewe elit.',
  mini = true,
  date,
  onPressPostMenu,
  creatingAPost = false,
  location = 'Ghana Accra',
  children,
  onLongPress,
  fullScreen = false,
  topFigures = [
    new Date().toString(),
    new Date().toString(),
    new Date().toString(),
    new Date().toString(),
    new Date().toString(),
  ],
  onTapTopFigure,
  onComment,
  onShare,
  onPush,
  onTapName,
  onTapImage,
  onTapPost,
  pushValue,
}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={mini ? 0.9 : 1}
        // onPress={!creatingAPost && onTapPost}
        // onLongPress={!creatingAPost && onPressPostMenu}
        delayLongPress={200}>
        <View style={styles.post}>
          <View style={styles.headerArea}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity activeOpacity={0.4} onPress={onTapImage}>
                <View style={styles.logoContainer}>
                  <RenamedImage
                    source={
                      profileImage
                        ? {uri: profileImage}
                        : require('../assets/1.jpg')
                    }
                    style={styles.img}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.initials}>
                <TouchableOpacity activeOpacity={0.4} onPress={onTapName}>
                  <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <Text style={styles.date}>
                  {date} |<Text style={styles.location}> {location}</Text>
                </Text>
              </View>
            </View>

            <PostActionIcon
              useDefault={false}
              onPress={onPressPostMenu}
              iconName="ellipsis-vertical-outline"
              showText={false}
            />
          </View>
          {description ? (
            <View style={styles.descriptionArea}>
              <Text style={styles.desc}>{description}</Text>
            </View>
          ) : null}
          {postMedias ? (
            <View style={[styles.postImageWrapper]}>
              {/* {console.log(postMedias, ' from sponsorsPost')} */}
              <AppCarousel
                useData={postMedias}
                postSize={postHeight}
                // postSize={
                //   postMedias[0]?.height < 600
                //     ? postMedias[0]?.height
                //     : height / 1.5
                // }
              />
            </View>
          ) : null}
          <View style={styles.topFiguresWrapper}>
            <PostActionIcon
              iconName="share-alternative"
              onPress={onPush}
              value={pushValue}
              size={30}
              showText={true}
              extraIconStyles={{marginRight: 0}}
            />
            <TouchableOpacity activeOpacity={0.6} onPress={onTapTopFigure}>
              <View style={styles.topFiguresWrapperLikes}>
                {topFigures.map((topFigure, index) => (
                  <TopFigure topFigureImage={profileImage} key={index} />
                ))}
                <Text style={styles.likers}>+4m others</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.postActions}>
              <PostActionIcon
                iconName="new-message"
                value={55}
                onPress={onComment}
              />
              <PostActionIcon
                iconName="share"
                value={120943}
                showText={false}
                onPress={onShare}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {children}
    </>
  );
};

const avatarWidth = width / 13;
export default memo(SponsorPost);

const styles = StyleSheet.create({
  post: {
    width: width,
    backgroundColor: colors.pureWhite,
    height: undefined,
  },
  headerArea: {
    // paddingVertical: universalPadding / 10,
    alignItems: 'center',
    height: undefined,
    width: '100%',
    backgroundColor: colors.pureWhite,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postImageWrapper: {
    // height: postHeight,
    width: width,
    backgroundColor: 'transparent',
  },
  descriptionArea: {
    paddingVertical: universalPadding / 10,
    paddingHorizontal: universalPadding / 7,
    height: undefined,
    width: '100%',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    width: avatarWidth,
    height: avatarWidth,
    backgroundColor: 'transparent',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  initials: {
    width: '80%',
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: universalPadding / 8,
  },
  name: {
    color: colors.hairLineColor,
    fontWeight: '700',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  date: {
    color: colors.hairLineColor,
    fontWeight: '300',
    textTransform: 'lowercase',
    fontSize: 10,
  },
  location: {
    color: colors.hairLineColor,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  desc: {
    color: '#010',
    fontWeight: '400',
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

  topFiguresWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: universalPadding / 3,
  },
  topFiguresWrapperLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likers: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 3,
    fontSize: 10,
    backgroundColor: 'black',
    marginLeft: -10,
    borderRadius: 12,
    padding: 2,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: avatarWidth * 3,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
