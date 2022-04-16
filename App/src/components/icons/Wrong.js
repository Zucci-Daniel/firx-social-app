import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Wro from '../../assets/svg-raw/wrong.svg';

const Wrong = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Wro width={100} height={100} />
    </TouchableOpacity>
  );
};

export default Wrong;
