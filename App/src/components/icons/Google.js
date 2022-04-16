import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import GG from '../../assets/svg-raw/google.svg';

const Google = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GG width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Google;
