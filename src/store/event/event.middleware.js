import {RESTORE_ELEMENT} from '../trash/trash.actiontype';
import {UPDATE_VERSION} from '../event/event.actiontype';
import {createOrUpdateEvent, updateVersionEvents} from '../event/event.actions';
import {themeFields} from '../../config/style';

const eventMiddleware = store => next => action => {
  switch (action.type) {
    case RESTORE_ELEMENT:
      if (action.payload.data.type === themeFields.items.event) {
        store.dispatch(createOrUpdateEvent(action.payload.data.element));
      }
      break;
    case UPDATE_VERSION:
      store.dispatch(updateVersionEvents(action.payload.version));
      break;
  }
  return next(action);
};
export default eventMiddleware;
