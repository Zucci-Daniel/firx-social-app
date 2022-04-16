import React, {useRef} from 'react';
import {Pressable, StyleSheet, View, Button} from 'react-native';
import {width, height, postHeight} from '../config/config';
// import VideoPlayer from 'react-native-video-controls';
import {useNavigation} from '@react-navigation/native';
import {Video, AVPlaybackStatus} from 'expo-av';
import PlayIcon from './PlayIcon';

const AppPostVideo = ({
  videoUri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  shouldPlay = false,
  useHeight = 400,
  thumbnail = 'https://baconmockup.com/300/200/',
}) => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [status, setStatus] = React.useState({});

  const handleStatus = () => {
    console.log('free ');
    return status.isPlaying
      ? videoRef.current.pauseAsync()
      : videoRef.current.playAsync();
  };

  return (
    <Pressable>
      <View style={[styles.container, {height: useHeight}]}>
        <Video
          style={{width: '100%', height: '100%'}}
          ref={videoRef}
          shouldPlay={shouldPlay}
          source={{
            uri: videoUri,
          }}
          posterSource={thumbnail}
          posterStyle={{width: '100%', height: '100%'}}
          useNativeControls
          resizeMode="cover"
          isLooping={true}
          isMuted
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      <PlayIcon
        onPress={handleStatus}
        iconName={status.isPlaying ? 'pause' : 'play'}
        extraPlayStyles={styles.extraPlayStyles}
      />
    </Pressable>
  );
};

export default AppPostVideo;

const styles = StyleSheet.create({
  container: {
    width: width,
    margin: 0,
    position: 'relative',
    // backgroundColor:'orange'
  },
  extraPlayStyles: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
});
