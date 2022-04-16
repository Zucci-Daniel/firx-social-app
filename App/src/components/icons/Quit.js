import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Power from '../../assets/svg-raw/quit.svg';

const Quit = ({onPress,extraStyles}) => {
  return (
    <TouchableOpacity onPress={onPress} style={extraStyles}>
      <Power width={40} height={40} />
    </TouchableOpacity>
  );
};

export default Quit;
