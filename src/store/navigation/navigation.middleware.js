import {GO_TO, GO_BACK} from './navigation.actiontype';
import {removeContextMenu} from './navigation.actions';

const navigationMiddleware = store => next => action => {
  switch (action.type) {
    case GO_TO:
      if (action.payload.data !== store.getState().navigation.currentPage) {
        store.dispatch(removeContextMenu());
      }
      break;
    case GO_BACK:
      store.dispatch(removeContextMenu());
      break;
  }
  return next(action);
};
export default navigationMiddleware;
