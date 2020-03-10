import {DELETE_NOTE} from '../note/note.actiontype';
import {DELETE_TASK} from '../task/task.actiontype';
import {DELETE_EVENT} from '../event/event.actiontype';
import {addElementToTrash} from './trash.actions';

const trashMiddleware = store => next => action => {
  switch (action.type) {
    case DELETE_NOTE:
    case DELETE_TASK:
    case DELETE_EVENT:
      const now = new Date();
      store.dispatch(
        addElementToTrash({
          key:
            'trashed-' +
            action.payload.elementType +
            '-' +
            action.payload.data.id,
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
