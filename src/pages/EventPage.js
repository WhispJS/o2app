import React from 'react';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import Page from '../components/Page/Page';
import {Calendar, Agenda, CalendarList} from 'react-native-calendars';
import {getPageParams} from '../store/navigation/navigation.selectors';
import {getCurrentElement} from '../store/element/element.selectors';

const EventPage = () => {
  const params = useSelector(getPageParams);
  const currentEvent = useSelector(getCurrentElement);
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <Page>
      {params.isEditing ? (
        <LinkedElements linked={currentEvent.linked} />
      ) : (
        <Agenda firstDay={1} />
      )}
    </Page>
  );
};

export default EventPage;
