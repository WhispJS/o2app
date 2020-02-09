import {GO_TO, GO_BACK} from './navigation.actiontype';
import {removeContextMenu} from './navigation.actions';

const navigationMiddleware = store => next => action => {
  switch (action.type) {
    case GO_TO:
    case GO_BACK:
      store.dispatch(removeContextMenu());
  }
  return next(action);
};
export default navigationMiddleware;
