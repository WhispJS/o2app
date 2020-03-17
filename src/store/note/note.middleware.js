import {RESTORE_ELEMENT} from '../trash/trash.actiontype';
import {UPDATE_VERSION} from '../update/update.actiontypes';
import {
  createOrUpdateNote,
  updateVersionNotes,
  linkElementToNote,
} from '../note/note.actions';
import {themeFields} from '../../config/style';

const noteMiddleware = store => next => action => {
  switch (action.type) {
    case RESTORE_ELEMENT:
      if (action.payload.data.type === themeFields.items.note) {
        store.dispatch(createOrUpdateNote(action.payload.data.element));
      }
      break;
    case UPDATE_VERSION:
      store.dispatch(updateVersionNotes(action.payload.version));
      break;
  }
  return next(action);
};
export default noteMiddleware;
