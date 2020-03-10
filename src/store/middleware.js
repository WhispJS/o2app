import {applyMiddleware} from 'redux';
import navigationMiddleware from './navigation/navigation.middleware';
import themesMiddleware from './themes/themes.middleware';
import noteMiddleware from './note/note.middleware';
import eventMiddleware from './event/event.middleware';
import taskMiddleware from './task/task.middleware';
import trashMiddleware from './trash/trash.middleware';
import authMiddleware from './auth/auth.middleware';

const rootMiddleware = () =>
  applyMiddleware(
    authMiddleware,
    navigationMiddleware,
    themesMiddleware,
    noteMiddleware,
    eventMiddleware,
    taskMiddleware,
    trashMiddleware,
  );

export default rootMiddleware;
