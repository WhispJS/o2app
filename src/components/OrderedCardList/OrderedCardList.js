import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentSettings} from '../../store/themes/themes.selectors';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
import Card from '../Card/Card';

const OrderCardList = ({data}) => {
  const noDataText = {
    note: 'No note',
    event: 'No event',
    task: 'No task',
  };
  const currentSettings = useSelector(getCurrentSettings);
  const [currentNavIndexes, setCurrentNavIndexes] = useState({
    task: 0,
    note: 0,
    event: 0,
  });
  const reOrderData = (order, rawData) => {
    const sortByOrderArrayGiven = (a, b) => {
      const flattenedOrderArray = order.map(item => item.key);
      return (
        flattenedOrderArray.indexOf(a.key) - flattenedOrderArray.indexOf(b.key)
      );
    };
    return rawData.sort(sortByOrderArrayGiven);
  };

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
      data={reOrderData(currentSettings.cardOrder, data)}
      contentContainerStyle={orderCardListStyle.content}
      typeExtractor={item => item.key}
      renderItem={({item}) => (
        <Card
          type={item.key}
          title={
            item.data.length
              ? `${currentNavIndexes[item.key] + 1}/${item.data.length} ${
                  item.key
                }${item.data.length > 1 ? 's' : ''}`
              : noDataText[item.key]
          }
          optionalActions={[{key: 'add'}]}
          onForwardPress={() => onForwardPress(item.key)}
          onBackPress={() => onBackPress(item.key)}
          navigation>
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
