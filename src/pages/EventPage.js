import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getEvents} from '../store/event/event.selectors';
import {StyleSheet} from 'react-native';
import {emptyEvent} from '../store/event/event.reducer';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import Page from '../components/Page/Page';
import {Calendar, Agenda, CalendarList} from 'react-native-calendars';
import {getPageParams} from '../store/navigation/navigation.selectors';

const EventPage = () => {
  const params = useSelector(getPageParams);
  const currentTheme = useSelector(getCurrentTheme);
  // const events = useSelector(getEvents);
  // const [currentEvent, setCurrentEvent] = useState(emptyEvent);

  return (
    <Page>
      {params.isEditing ? (
        <LinkedElements
          element={currentEvent}
          elementType={themeFields.items.event}
        />
      ) : (
        <Agenda firstDay={1} />
      )}
    </Page>
  );
};

const eventPageStyle = theme => {
  const borderRadius = 8;
  return StyleSheet.create({
    horizontalInputContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: 10,
    },
    verticalInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: 5,
      borderWidth: 1,
      borderRadius: borderRadius,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    inputLabel: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      marginRight: 10,
    },
    contentInputView: {
      flexDirection: 'row',
    },
  });
};
export default EventPage;
