import {DELETE_NOTE} from '../note/note.actiontype';
import {DELETE_TASK} from '../task/task.actiontype';
import {DELETE_EVENT} from '../event/event.actiontype';
import {addElementToTrash} from './trash.actions';
import {unlinkElementToNote} from '../note/note.actions';
import {unlinkElementToTask, linkElementToTask} from '../task/task.actions';
import {unlinkElementToEvent, linkElementToEvent} from '../event/event.actions';
import {RESTORE_ELEMENT} from './trash.actiontype';

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
      action.payload.data.linked.note.forEach(linkedNote => {
        store.dispatch(
          unlinkElementToNote(
            linkedNote,
            action.payload.data,
            action.payload.elementType,
          ),
        );
      });
      action.payload.data.linked.task.forEach(linkedTask => {
        store.dispatch(
          unlinkElementToTask(
            linkedTask,
            action.payload.data,
            action.payload.elementType,
          ),
        );
      });
      action.payload.data.linked.event.forEach(linkedEvent => {
        store.dispatch(
          unlinkElementToEvent(
            linkedEvent,
            action.payload.data,
            action.payload.elementType,
          ),
        );
      });
      break;
    case RESTORE_ELEMENT:
      action.payload.data.element.linked.note.forEach(linkedNote => {
        store.dispatch(
          linkElementToNote(
            linkedNote,
            action.payload.data.element,
            action.payload.data.type,
          ),
        );
      });
      action.payload.data.element.linked.task.forEach(linkedTask => {
        store.dispatch(
          linkElementToTask(
            linkedTask,
            action.payload.data.element,
            action.payload.data.type,
          ),
        );
      });
      action.payload.data.element.linked.event.forEach(linkedEvent => {
        store.dispatch(
          linkElementToEvent(
            linkedEvent,
            action.payload.data.element,
            action.payload.data.type,
          ),
        );
      });
      break;
  }
  return next(action);
};
export default trashMiddleware;
