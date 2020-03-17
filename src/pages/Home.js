import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import routes from '../config/routes';
import {getCurrentPage} from '../store/navigation/navigation.selectors';
import {checkForUpdate} from '../store/update/update.actions';
import {version as appVersion} from '../../app.json';

const Home = props => {
  const currentPath = useSelector(getCurrentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkForUpdate(appVersion));
  }, []);
  return routes.map(
    (route, index) =>
      route.path === currentPath && <route.component key={index} {...props} />,
  );
};

export default Home;
