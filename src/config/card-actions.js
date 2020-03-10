import {useDispatch} from 'react-redux';
import {goTo} from '../store/navigation/navigation.actions';
import {paths} from '../config/routes';
import {emptyTask} from '../store/task/task.reducer';
import {emptyNote} from '../store/note/note.reducer';
import {emptyEvent} from '../store/event/event.reducer';
import {themeFields} from '../config/style';
import {deleteNote} from '../store/note/note.actions';
import {deleteTask} from '../store/task/task.actions';
const emptyElement = {
  [themeFields.items.note]: emptyNote,
  [themeFields.items.task]: emptyTask,
  [themeFields.items.event]: emptyEvent,
};
export const homeActions = (type, element, dispatch) => [
  {key: 'share'},
  {
    key: 'edit',
    onPress: () => {
      dispatch(goTo(paths[type], {[type]: element, isEditing: true}));
    },
  },
  {
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
          break;
      }
    },
  },
  {
    key: 'add',
    onPress: () =>
      dispatch(
        goTo(paths[type], {
          [type]: emptyElement[type],
          isEditing: true,
        }),
      ),
  },
];

export const elementPageActions = (type, element, dispatch) => [
  {key: 'share'},
  {
    key: 'edit',
    onPress: () => {
      dispatch(goTo(paths[type], {[type]: element, isEditing: true}));
    },
  },
  {
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
          break;
      }
    },
  },
];

export const trashActions = (type, element) => [
  {key: 'restore', text: 'Restore'},
];
