import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Logo from '../../assets/svg-raw/logo.svg';

const AppLogo = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Logo width={40} height={40} />
    </TouchableOpacity>
  );
};

export default AppLogo;
