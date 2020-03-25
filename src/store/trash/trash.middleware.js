import {addElementToTrash} from './trash.actions';
import {DELETE_ELEMENT} from '../element/element.actiontypes';

const trashMiddleware = store => next => action => {
  switch (action.type) {
    case DELETE_ELEMENT:
      store.dispatch(
        addElementToTrash(action.payload.element, action.payload.type),
      );
      break;
  }
  return next(action);
};
export default trashMiddleware;
