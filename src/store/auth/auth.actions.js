import {SIGN_IN, SIGN_OUT} from './auth.actiontypes';

export const signIn = userData => ({
  type: SIGN_IN,
  payload: {data: userData},
});
export const signOut = () => ({type: SIGN_OUT});
