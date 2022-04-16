import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Facebook from '../../assets/svg-raw/fb.svg';

const Fb = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Facebook width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Fb;
