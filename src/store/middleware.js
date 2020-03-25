import {applyMiddleware} from 'redux';
import navigationMiddleware from './navigation/navigation.middleware';
import themesMiddleware from './themes/themes.middleware';
import trashMiddleware from './trash/trash.middleware';
import authMiddleware from './auth/auth.middleware';
import updateMiddleware from './update/update.middleware';
import elementMiddleware from './element/element.middleware';

const rootMiddleware = () =>
  applyMiddleware(
    authMiddleware,
    navigationMiddleware,
    themesMiddleware,
    elementMiddleware,
    trashMiddleware,
    updateMiddleware,
  );

export default rootMiddleware;
