import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {containerStyles, textStyles, themeFields} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../store/themes/themes.selectors';
import Card from '../components/Card/Card';

const Main = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <Page theme={currentTheme}>
      <FlatList
        data={[
          {key: 'note', type: themeFields.items.note, data: []},
          {
            key: 'task',
            type: themeFields.items.task,
            data: ['first task', 'second task'],
          },
          {key: 'event', type: themeFields.items.event, data: ['event']},
        ]}
        contentContainerStyle={mainPageStyle.content}
        typeExtractor={item => item.type}
        renderItem={({item}) => (
          <Card
            type={item.type}
            title={
              item.data.length
                ? `${item.data.length} ${item.type}${
                    item.data.length > 1 ? 's' : ''
                  }`
                : noDataText[item.type]
            }
            content={'test'}
          />
        )}
      />
    </Page>
  );
};

const noDataText = {
  note: 'No note',
  event: 'No event',
  task: 'No task',
};
const mainPageStyle = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
export default Main;
