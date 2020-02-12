import React, {useState} from 'react';
import {Text} from 'react-native';
import {themeFields, icons} from '../config/style';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import {getEvents} from '../store/event/event.selectors';
import {StyleSheet} from 'react-native';
import {emptyEvent} from '../store/event/event.reducer';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import LinkedElements from '../components/LinkedElements/LinkedElements';
import ElementPage from '../components/Page/ElementPage';

const EventPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const events = useSelector(getEvents);
  const [currentEvent, setCurrentEvent] = useState(emptyEvent);

  const onChangeTitle = ({nativeEvent}) => {
    const updatedEvent = {...currentEvent, title: nativeEvent.text};
    setCurrentEvent(updatedEvent);
  };

  const onChangeContent = ({nativeEvent}) => {
    const updatedEvent = {...currentEvent, content: nativeEvent.text};
    setCurrentEvent(updatedEvent);
  };

  return (
    <ElementPage
      elementType={themeFields.items.event}
      emptyElement={emptyEvent}
      elements={events}>
      <LinkedElements element={currentEvent} />
    </ElementPage>
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
