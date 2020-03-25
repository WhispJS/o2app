import React from 'react';
import ElementPage from '../components/Page/ElementPage';
import {elementTypes} from '../config/meta';

const EventPage = () => {
  return <ElementPage elementType={elementTypes.event} />;
};

export default EventPage;
