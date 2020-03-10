import React from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {icons, general, menuStyles, themeFields} from '../../config/style';
import {useDispatch, useSelector} from 'react-redux';
import {goTo} from '../../store/navigation/navigation.actions';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import {paths} from '../../config/routes';

const Menu = ({items, menuContainerStyle, iconSize, horizontal = false}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  const handleMenuPress = item => {
    if (item.onPress) {
      item.onPress();
    } else {
      dispatch(goTo(paths[item.key], {isEditing: false}));
    }
  };
  return (
    <View style={menuContainerStyle}>
      <View
        style={[
          menuStyle(currentTheme, themeFields.items.general, currentSettings)
            .menuList,
          horizontal ? orientation.horizontal : orientation.vertical,
        ]}>
        {items.map(menuItem => (
          <TouchableOpacity
            key={menuItem.key}
            style={
              menuStyle(currentTheme, menuItem.theme, currentSettings).button
            }
            onPress={() => handleMenuPress(menuItem)}>
            <Icon
              name={icons[menuItem.key]}
              type={icons.type}
              size={iconSize}
              color={
                currentTheme.colors[menuItem.theme][
                  themeFields.styles.secondaryColor
                ]
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const menuStyle = (theme, type, settings) => {
  return StyleSheet.create({
    menuList: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    button: {
      borderRadius: 200,
      padding: 15,
      margin: 5,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
  });
};

const orientation = StyleSheet.create({
  horizontal: {flexDirection: 'row'},
  vertical: {flexDirection: 'column'},
});
export default Menu;
