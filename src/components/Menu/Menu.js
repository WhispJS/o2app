import React from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  containerStyles,
  buttonStyles,
  icons,
  general,
  menuStyles,
  settingsFields,
  textStyles,
  themeFields,
} from '../../config/style';
import {useDispatch, useSelector} from 'react-redux';
import {goTo} from '../../store/navigation/navigation.actions';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import {paths} from '../../config/routes';
import Color from 'color';

const Menu = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  const handleMenuPress = path => {
    dispatch(goTo(path));
  };
  return (
    <View
      style={
        menuStyle(currentTheme, currentSettings, themeFields.items.general)
          .container
      }>
      <FlatList
        horizontal={
          currentSettings[settingsFields.menuStyle] === menuStyles.neutral
        }
        contentContainerStyle={
          menuStyle(currentTheme, currentSettings, themeFields.items.general)
            .menuList
        }
        data={currentSettings[settingsFields.menu]}
        renderItem={({item}) => (
          <TouchableOpacity
            style={menuStyle(currentTheme, currentSettings, item.theme).button}
            onPress={() => handleMenuPress(paths[item.key])}>
            <Icon
              name={icons[item.key]}
              type={icons.type}
              size={general.menuButtonSize}
              color={Color(currentTheme.colors[item.theme].mainColor)
                .darken(0.5)
                .hex()}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const menuStyle = (theme, settings, type) => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderRadius: 10,
    },
    menuList: {
      flex: 1,
      justifyContent:
        settings[settingsFields.menuStyle] === menuStyles.neutral
          ? 'space-around'
          : 'center',
    },
    button: {
      borderRadius: 200,
      padding: 15,
      margin: 10,
      backgroundColor: theme.colors[type][themeFields.styles.secondaryColor],
    },
  });
};
export default Menu;
