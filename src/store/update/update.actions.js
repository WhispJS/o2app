import {UPDATE_VERSION, CHECK_FOR_UPDATE} from './update.actiontypes';

export const updateVersion = version => ({
  type: UPDATE_VERSION,
  payload: {version},
});

export const checkForUpdate = version => ({
  type: CHECK_FOR_UPDATE,
  payload: {version},
});
