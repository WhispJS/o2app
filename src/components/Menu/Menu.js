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
import {getContextualMenu} from '../../store/navigation/navigation.selectors';

// Contextual Menu must be of shape {key: <icon of the menu item>, onPress: <function that is called when menu item is called>}
const Menu = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const contextualMenu = useSelector(getContextualMenu);
  const dispatch = useDispatch();

  const handleMainMenuPress = path => {
    dispatch(goTo(path));
  };
  return (
    <View style={menuStyle(currentTheme, themeFields.items.general).container}>
      {contextualMenu && (
        <FlatList
          horizontal={
            currentSettings[settingsFields.menuStyle] === menuStyles.neutral
          }
          style={
            menuStyle(currentTheme, themeFields.items.general).contextualMenu
          }
          contentContainerStyle={
            menuStyle(currentTheme, themeFields.items.general).menuList
          }
          data={contextualMenu}
          renderItem={({item}) => (
            <TouchableOpacity
              style={menuStyle(currentTheme, themeFields.items.other).button}
              onPress={item.onPress}>
              <Icon
                name={icons[item.key]}
                type={icons.type}
                size={general.menuButtonSize}
                color={
                  currentTheme.colors[themeFields.items.other][
                    themeFields.styles.secondaryColor
                  ]
                }
              />
            </TouchableOpacity>
          )}
        />
      )}
      <FlatList
        horizontal={
          currentSettings[settingsFields.menuStyle] === menuStyles.neutral
        }
        style={menuStyle(currentTheme, themeFields.items.general).mainMenu}
        contentContainerStyle={
          menuStyle(currentTheme, themeFields.items.general).menuList
        }
        data={currentSettings[settingsFields.menu]}
        renderItem={({item}) => (
          <TouchableOpacity
            style={menuStyle(currentTheme, item.theme).button}
            onPress={() => handleMainMenuPress(paths[item.key])}>
            <Icon
              name={icons[item.key]}
              type={icons.type}
              size={general.menuButtonSize}
              color={
                currentTheme.colors[item.theme][
                  themeFields.styles.secondaryColor
                ]
              }
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const menuStyle = (theme, type) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderRadius: 10,
    },
    contextualMenu: {
      flex: 1,
    },
    mainMenu: {flex: 6},
    menuList: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      borderRadius: 200,
      padding: 15,
      margin: 10,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
  });
};
export default Menu;
