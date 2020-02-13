import React from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
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
    dispatch(goTo(path, {isEditing: false}));
  };
  return (
    <View
      style={
        menuStyle(currentTheme, themeFields.items.general, currentSettings)
          .container
      }>
      {contextualMenu && (
        <>
          <View
            style={
              menuStyle(
                currentTheme,
                themeFields.items.general,
                currentSettings,
              ).menuList
            }>
            {contextualMenu.map(menuItem => (
              <TouchableOpacity
                key={menuItem.key}
                style={
                  menuStyle(
                    currentTheme,
                    themeFields.items.other,
                    currentSettings,
                  ).button
                }
                onPress={menuItem.onPress}>
                <Icon
                  name={icons[menuItem.key]}
                  type={icons.type}
                  size={general.menuButtonSize}
                  color={
                    currentTheme.colors[themeFields.items.other][
                      themeFields.styles.secondaryColor
                    ]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <Divider
            style={
              menuStyle(
                currentTheme,
                themeFields.items.general,
                currentSettings,
              ).dividerStyle
            }
          />
        </>
      )}
      <View
        style={
          menuStyle(currentTheme, themeFields.items.general, currentSettings)
            .menuList
        }>
        {currentSettings[settingsFields.menu].map(menuItem => (
          <TouchableOpacity
            key={menuItem.key}
            style={
              menuStyle(currentTheme, menuItem.theme, currentSettings).button
            }
            onPress={() => handleMainMenuPress(paths[menuItem.key])}>
            <Icon
              name={icons[menuItem.key]}
              type={icons.type}
              size={general.menuButtonSize}
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
    container: {
      flex: 1,
      borderWidth: 1,
      flexDirection:
        settings.menuStyle === menuStyles.neutral ? 'row' : 'column',
      justifyContent: 'space-evenly',
      borderStyle: 'solid',
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderRadius: 10,
    },
    menuList: {
      alignItems: 'center',
      flexDirection:
        settings.menuStyle === menuStyles.neutral ? 'row' : 'column',
      justifyContent: 'space-evenly',
    },
    dividerStyle: {
      height: 1,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
    button: {
      borderRadius: 200,
      padding: 15,
      margin: 3,
      backgroundColor: theme.colors[type][themeFields.styles.mainColor],
    },
  });
};
export default Menu;
