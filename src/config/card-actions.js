import {useDispatch} from 'react-redux';
import {goTo} from '../store/navigation/navigation.actions';
import {paths} from '../config/routes';
import {emptyTask} from '../store/task/task.reducer';
import {emptyNote} from '../store/note/note.reducer';
import {emptyEvent} from '../store/event/event.reducer';
import {themeFields} from '../config/style';
import {deleteNote} from '../store/note/note.actions';
import {deleteTask} from '../store/task/task.actions';
import {deleteEvent} from '../store/event/event.actions';
import {restoreElement} from '../store/trash/trash.actions';
const emptyElement = {
  [themeFields.items.note]: emptyNote,
  [themeFields.items.task]: emptyTask,
  [themeFields.items.event]: emptyEvent,
};
const shareAction = (type, element, dispatch) => ({key: 'share'});
const editAction = (type, element, dispatch) => ({
  key: 'edit',
  onPress: () => {
    dispatch(goTo(paths[type], {[type]: element, isEditing: true}));
  },
});
const deleteAction = (type, element, dispatch) => ({
  key: 'delete',
  onPress: () => {
    switch (type) {
      case themeFields.items.note:
        dispatch(deleteNote(element));
        break;
      case themeFields.items.task:
        dispatch(deleteTask(element));
        break;
      case themeFields.items.event:
        dispatch(deleteEvent(element));
        break;
    }
  },
});
const addAction = (type, element, dispatch) => ({
  key: 'add',
  onPress: () =>
    dispatch(
      goTo(paths[type], {
        [type]: emptyElement[type],
        isEditing: true,
      }),
    ),
});
const restoreAction = (type, element, dispatch) => ({
  key: 'restore',
  text: 'Restore',
  onPress: () => dispatch(restoreElement({type, element})),
});

export const homeActions = (type, element, dispatch) => [
  addAction(type, element, dispatch),
  editAction(type, element, dispatch),
  shareAction(type, element, dispatch),
  deleteAction(type, element, dispatch),
];

export const elementPageActions = (type, element, dispatch) => [
  editAction(type, element, dispatch),
  shareAction(type, element, dispatch),
  deleteAction(type, element, dispatch),
];

export const trashActions = (type, element, dispatch) => [
  restoreAction(type, element, dispatch),
];
