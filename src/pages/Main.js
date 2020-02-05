import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {
  containerStyles,
  textStyles,
  themeFields,
  settingsFields,
} from '../config/style';
import Page from '../components/Page/Page';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../store/themes/themes.selectors';
import Card from '../components/Card/Card';

const fakeData = [
  {type: 'task', data: ['task one', 'task two']},
  {type: 'note', data: ['first note']},
];

const Main = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);

  const reOrderData = (order, data) => {
    return order.map(item => ({
      key: item.key,
      type: item.key,
      data: data.filter(elem => elem.type === item.key).map(elem => elem.data),
    }));
  };

  return (
    <Page theme={currentTheme}>
      <FlatList
        data={reOrderData(currentSettings.cardOrder, fakeData)}
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
            }>
            {item.data && <Text>{item.data[0]}</Text>}
          </Card>
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
