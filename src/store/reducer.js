import {combineReducers} from 'redux';
import navigationReducer from './navigation/navigation.reducer';
import themeReducer from './themes/themes.reducer';
import eventReducer from './event/event.reducer';
import taskReducer from './task/task.reducer';
import noteReducer from './note/note.reducer';
import trashReducer from './trash/trash.reducer';
import authReducer from './auth/auth.reducer';

const rootReducer = () =>
  combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
    themes: themeReducer,
    event: eventReducer,
    task: taskReducer,
    note: noteReducer,
    trash: trashReducer,
  });

export default rootReducer;
