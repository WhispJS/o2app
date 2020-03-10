import {RESTORE_ELEMENT} from '../trash/trash.actiontype';
import {createOrUpdateTask} from '../task/task.actions';
import {themeFields} from '../../config/style';

const taskMiddleware = store => next => action => {
  switch (action.type) {
    case RESTORE_ELEMENT:
      if (action.payload.data.type === themeFields.items.task) {
        store.dispatch(createOrUpdateTask(action.payload.data.element));
      }
      break;
  }
  return next(action);
};
export default taskMiddleware;
