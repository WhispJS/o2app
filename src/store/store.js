import {createStore, compose} from 'redux';
import rootReducer from './reducer';
import rootMiddleware from './middleware';
import {AsyncStorage} from 'react-native';
import {persistReducer, persistStore} from 'redux-persist';

// const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer());

const store = createStore(persistedReducer, rootMiddleware());
const persistor = persistStore(store);
export default {store, persistor};
