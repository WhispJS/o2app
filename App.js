import React from 'react';
import AuthenticationPage from './src/pages/AuthenticationPage';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthenticationPage />
    </Provider>
  );
};

export default App;
