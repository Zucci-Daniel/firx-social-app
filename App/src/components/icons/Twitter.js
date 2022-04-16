import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Tweet from '../../assets/svg-raw/twitter.svg';

const Twitter = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Tweet width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Twitter;
