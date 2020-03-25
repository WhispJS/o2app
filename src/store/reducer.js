import {combineReducers} from 'redux';
import navigationReducer from './navigation/navigation.reducer';
import themeReducer from './themes/themes.reducer';
import trashReducer from './trash/trash.reducer';
import authReducer from './auth/auth.reducer';
import updateReducer from './update/update.reducer';
import elementReducer from './element/element.reducer';

const rootReducer = () =>
  combineReducers({
    auth: authReducer,
    update: updateReducer,
    navigation: navigationReducer,
    themes: themeReducer,
    elements: elementReducer,
    trash: trashReducer,
  });

export default rootReducer;
