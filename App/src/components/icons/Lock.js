import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Locked from '../../assets/svg-raw/lock.svg';

const Lock = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Locked width={100} height={100} />
    </TouchableOpacity>
  );
};

export default Lock;
