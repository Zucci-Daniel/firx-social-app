import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Ph from '../../assets/svg-raw/phone.svg';

const Phone = ({onPress}) => {
  return  <TouchableOpacity onPress={onPress}>
  <Ph width={40} height={40} />
</TouchableOpacity>;
};

export default Phone;
