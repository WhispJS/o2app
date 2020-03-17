import {UPDATE_VERSION} from './update.actiontypes';
const initialState = {
  currentVersion: '0.0',
};

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VERSION:
      return {...state, currentVersion: action.payload.version};
    default:
      return state;
  }
};

export default updateReducer;
