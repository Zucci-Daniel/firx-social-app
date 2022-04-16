import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import BB from '../../assets/svg-raw/bomb.svg';

const Bomb = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BB width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Bomb;
