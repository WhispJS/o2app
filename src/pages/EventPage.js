import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../store/themes/themes.selectors';
import Card from '../components/Card/Card';
import {FlatList} from 'react-native';
import {getEvents} from '../store/event/event.selectors';

const EventPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const events = useSelector(getEvents);
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>EventPage</Text>
      <FlatList
        data={events}
        contentContainerStyle={eventPageStyle.content}
        renderItem={({item}) => (
          <Card type={themeFields.items.task} title={item}>
            {item}
          </Card>
        )}
      />
    </Page>
  );
};

const eventPageStyle = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
export default EventPage;
