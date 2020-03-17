import {CHECK_FOR_UPDATE} from './update.actiontypes';
import {updateVersion} from './update.actions';

const updateMiddleware = store => next => action => {
  switch (action.type) {
    case CHECK_FOR_UPDATE:
      if (store.getState().update.currentVersion !== action.payload.version) {
        store.dispatch(updateVersion(action.payload.version));
      }
      break;
  }
  return next(action);
};
export default updateMiddleware;
