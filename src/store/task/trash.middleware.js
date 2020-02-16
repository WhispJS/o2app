import {DELETE_NOTE} from '../note/note.actiontype';
import {DELETE_TASK} from './task.actiontype';
import {themeFields} from '../../config/style';
import {addElementToTrash} from './trash.actions';

const trashMiddleware = store => next => action => {
  switch (action.type) {
    case DELETE_NOTE:
    case DELETE_TASK:
      const now = new Date();
      store.dispatch(
        addElementToTrash({
          type: action.payload.elementType,
          element: action.payload.data,
          dateDeleted: now,
        }),
      );
      break;
  }
  return next(action);
};
export default trashMiddleware;
