import {React} from '../imports/all_RnComponents';
import {Stack, Nav_Container as NavContainer} from './create/CreateNavigation';

//later, refactor this
import Auth from './../screens/auths/Auth';
import {useContext} from 'react';
import {AppContext} from './../appContext';
import MainApp from './../screens/mainApp/MainApp';

const Navigation = () => {
  const {seenUserUID} = useContext(AppContext);

  return (
    <>
      <NavContainer>
        {seenUserUID ? <MainApp /> : <Auth />}
      </NavContainer>
    </>
  );
};

export default Navigation;
