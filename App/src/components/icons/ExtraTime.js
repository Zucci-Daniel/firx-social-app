import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Extra from '../../assets/svg-raw/exTime.svg';

const ExtraTime = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Extra width={40} height={40} />
    </TouchableOpacity>
  );
};

export default ExtraTime;
