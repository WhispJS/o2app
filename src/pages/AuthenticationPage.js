import React from 'react';
import {useSelector} from 'react-redux';
import Home from './Home';
import Blockstack from '../components/Authentication/Blockstack';
import {getUserData} from '../store/auth/auth.selectors';

const AuthenticationPage = () => {
  const userData = useSelector(getUserData);
  return userData ? <Home /> : <Blockstack />;
};

export default AuthenticationPage;
