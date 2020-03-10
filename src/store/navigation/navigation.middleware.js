import {GO_TO} from './navigation.actiontype';
import {themeFields} from '../../config/style';
import {updateCurrentNote} from '../note/note.actions';
import {updateCurrentTask} from '../task/task.actions';
import {removeContextMenu} from '../navigation/navigation.actions';

const elementPages = [
  themeFields.items.task,
  themeFields.items.note,
  themeFields.items.event,
];
const navigationMiddleware = store => next => action => {
  switch (action.type) {
    case GO_TO:
      const path = action.payload.data;
      store.dispatch(removeContextMenu());
      // If we are going to an element page, we want to set the current element according to params
      if (elementPages.includes(path)) {
        switch (path) {
          case themeFields.items.note:
            store.dispatch(
              updateCurrentNote(action.payload.params[themeFields.items.note]),
            );
            break;
          case themeFields.items.task:
            store.dispatch(
              updateCurrentTask(action.payload.params[themeFields.items.task]),
            );
        }
      }
      break;
  }
  return next(action);
};
export default navigationMiddleware;
