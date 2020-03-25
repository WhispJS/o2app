import React from 'react';
import Page from '../components/Page/Page';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../store/themes/themes.selectors';
import {getElementsForType} from '../store/element/element.selectors';
import {themeFields} from '../config/style';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {homeActions} from '../config/card-actions';
import {reorderData} from '../utils/reorder';
import {FlatList} from 'react-native';
import Card from '../components/Card/Card';
import {elementTypes} from '../config/meta';

const Main = () => {
  // Selectors
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const notes = useSelector(getElementsForType(elementTypes.note));
  const tasks = useSelector(getElementsForType(elementTypes.task));
  const events = useSelector(getElementsForType(elementTypes.event));

  // State
  const [currentNavIndexes, setCurrentNavIndexes] = useState({
    [elementTypes.note]: 0,
    [elementTypes.task]: 0,
    [elementTypes.event]: 0,
  });

  // Misc
  const data = [
    {key: elementTypes.task, data: [...tasks]},
    {key: elementTypes.note, data: [...notes]},
    {key: elementTypes.event, data: [...events]},
  ];

  const noDataText = {
    [elementTypes.note]: 'No note',
    [elementTypes.event]: 'No event',
    [elementTypes.task]: 'No task',
  };

  // Actions
  const dispatch = useDispatch();

  const onForwardPress = cardType => {
    if (
      currentNavIndexes[cardType] + 1 ===
      data.find(elem => elem.key === cardType).data.length
    ) {
      return;
    }
    setCurrentNavIndexes({
      ...currentNavIndexes,
      [cardType]: currentNavIndexes[cardType] + 1,
    });
  };

  const onBackPress = cardType => {
    if (currentNavIndexes[cardType] === 0) {
      return;
    }
    setCurrentNavIndexes({
      ...currentNavIndexes,
      [cardType]: currentNavIndexes[cardType] - 1,
    });
  };

  return (
    <Page theme={currentTheme}>
      <FlatList
        data={reorderData(currentSettings.cardOrder, data)}
        contentContainerStyle={orderCardListStyle.content}
        renderItem={({item}) => (
          <Card
            type={item.key}
            title={
              item.data.length
                ? `${currentNavIndexes[item.key] + 1}/${item.data.length} ${
                    item.data[currentNavIndexes[item.key]].title
                  }`
                : noDataText[item.key]
            }
            actions={homeActions(
              item.key,
              item.data[currentNavIndexes[item.key]],
              dispatch,
            )}
            optionalSideMenu={[
              {key: 'back', onPress: () => onBackPress(item.key)},
              {key: 'forward', onPress: () => onForwardPress(item.key)},
            ]}
            element={item.data[currentNavIndexes[item.key]]}
            multiple>
            {item.data &&
              item.data[currentNavIndexes[item.key]] &&
              item.data[currentNavIndexes[item.key]].content}
          </Card>
        )}
      />
    </Page>
  );
};

const orderCardListStyle = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default Main;
