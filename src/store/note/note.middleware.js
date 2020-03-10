import {RESTORE_ELEMENT} from '../trash/trash.actiontype';
import {createOrUpdateNote} from '../note/note.actions';
import {themeFields} from '../../config/style';

const noteMiddleware = store => next => action => {
  switch (action.type) {
    case RESTORE_ELEMENT:
      if (action.payload.data.type === themeFields.items.note) {
        store.dispatch(createOrUpdateNote(action.payload.data.element));
      }
      break;
  }
  return next(action);
};
export default noteMiddleware;
