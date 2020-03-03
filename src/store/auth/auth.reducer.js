import {SIGN_IN, SIGN_OUT} from './auth.actiontypes';

const initialAuthState = {
  userData: null,
  pubKey: null,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userData: action.payload.data.userData,
        pubKey: action.payload.data.pubKey,
      };
    case SIGN_OUT:
      return {...state, userData: null};
    default:
      return state;
  }
};

export default authReducer;
