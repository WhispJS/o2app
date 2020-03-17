import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentSettings} from '../../store/themes/themes.selectors';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
import Card from '../Card/Card';
import {reorderData} from '../../utils/reorder';
import {goTo} from '../../store/navigation/navigation.actions';
import {paths} from '../../config/routes';
import {themeFields} from '../../config/style';
import {homeActions} from '../../config/card-actions';

const OrderCardList = ({data}) => {
  const noDataText = {
    note: 'No note',
    event: 'No event',
    task: 'No task',
  };
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();
  const [currentNavIndexes, setCurrentNavIndexes] = useState({
    task: 0,
    note: 0,
    event: 0,
  });
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
    <FlatList
      data={reorderData(currentSettings.cardOrder, data)}
      contentContainerStyle={orderCardListStyle.content}
      typeExtractor={item => item.key}
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
  );
};

const orderCardListStyle = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
export default OrderCardList;
