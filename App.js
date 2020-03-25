import React from 'react';
import AuthenticationPage from './src/pages/AuthenticationPage';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={store.persistor}>
        <AuthenticationPage />
      </PersistGate>
    </Provider>
  );
};

export default App;
