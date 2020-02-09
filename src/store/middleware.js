import {applyMiddleware} from 'redux';
import navigationMiddleware from './navigation/navigation.middleware';
import themesMiddleware from './themes/themes.middleware';
import noteMiddleware from './note/note.middleware';
import eventMiddleware from './event/event.middleware';
import taskMiddleware from './task/task.middleware';

const rootMiddleware = () =>
  applyMiddleware(
    navigationMiddleware,
    themesMiddleware,
    noteMiddleware,
    eventMiddleware,
    taskMiddleware,
  );

export default rootMiddleware;
