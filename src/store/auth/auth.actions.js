import {SIGN_IN, SIGN_OUT} from './auth.actiontypes';

export const signIn = (userData, pubKey) => ({
  type: SIGN_IN,
  payload: {data: {userData, pubKey}},
});
export const signOut = () => ({type: SIGN_OUT});
