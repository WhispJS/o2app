import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Icon} from 'react-native-elements';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '../../store/themes/themes.selectors';
import {icons, themeFields} from '../../config/style';
import Color from 'color';

const OrderList = ({onDragEnd, data}) => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <View
      style={orderListStyle(currentTheme, themeFields.items.general).container}>
      <DraggableFlatList
        data={data}
        renderItem={({item, index, drag, isActive}) => (
          <TouchableOpacity
            style={orderListStyle(currentTheme, item.theme).listItem}
            onLongPress={drag}>
            <Icon
              name={icons[item.key]}
              type={icons.type}
              size={25}
              color={
                currentTheme.colors[item.theme][
                  themeFields.styles.secondaryColor
                ]
              }
            />
            <Text style={orderListStyle(currentTheme, item.theme).listText}>
              {' ' + item.key}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => `draggable-item-${item.key}`}
        onDragEnd={onDragEnd}
      />
    </View>
  );
};

const orderListStyle = (theme, type) => {
  return StyleSheet.create({
    container: {
      height: 255,
    },
    listItem: {
      marginBottom: 5,
      borderRadius: 8,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    listText: {
      color: theme.colors[type][themeFields.styles.secondaryColor],
    },
  });
};
export default OrderList;
