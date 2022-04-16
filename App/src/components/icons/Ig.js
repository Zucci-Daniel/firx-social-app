import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Instagram from '../../assets/svg-raw/ig.svg';

const Ig = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Instagram width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Ig;
