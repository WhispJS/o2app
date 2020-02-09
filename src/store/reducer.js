import {combineReducers} from 'redux';
import navigationReducer from './navigation/navigation.reducer';
import themeReducer from './themes/themes.reducer';
import eventReducer from './event/event.reducer';
import taskReducer from './task/task.reducer';
import noteReducer from './note/note.reducer';

const rootReducer = () =>
  combineReducers({
    navigation: navigationReducer,
    themes: themeReducer,
    event: eventReducer,
    task: taskReducer,
    note: noteReducer,
  });

export default rootReducer;
