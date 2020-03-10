import React from 'react';
import {View, StyleSheet} from 'react-native';
import Menu from '../Menu/Menu';
import {
  containerStyles,
  menuStyles,
  settingsFields,
  themeFields,
} from '../../config/style';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import Clock from '../Clock/Clock';
import {getContextualMenu} from '../../store/navigation/navigation.selectors';

const MainMenu = ({menuContainerStyle}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <Menu
      theme={currentTheme}
      items={currentSettings[settingsFields.menu]}
      iconSize={18}
      menuContainerStyle={menuContainerStyle}
      horizontal={currentSettings.menuStyle === menuStyles.neutral}
    />
  );
};

const ContextMenu = ({menuContainerStyle}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const contextualMenu = useSelector(getContextualMenu);
  return (
    contextualMenu && (
      <Menu
        theme={currentTheme}
        items={contextualMenu}
        iconSize={12}
        menuContainerStyle={menuContainerStyle}
        horizontal
      />
    )
  );
};

const Page = ({children}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const contextualMenu = useSelector(getContextualMenu);
  return (
    <View style={containerStyles(currentSettings, currentTheme).outerContainer}>
      <Clock
        containerStyle={
          pageStyle(currentTheme, currentSettings, contextualMenu != null)
            .clockContainerStyle
        }
      />
      <ContextMenu
        menuContainerStyle={
          pageStyle(currentTheme, currentSettings).contextMenuContainer
        }
      />
      <View style={containerStyles(currentSettings, currentTheme).container}>
        {currentSettings.menuStyle === menuStyles.leftHanded && (
          <MainMenu
            menuContainerStyle={
              pageStyle(currentTheme, currentSettings).mainMenuContainer
            }
          />
        )}

        <View style={containerStyles(currentSettings, currentTheme).main}>
          {children}
        </View>
        {currentSettings.menuStyle !== menuStyles.leftHanded && (
          <MainMenu
            menuContainerStyle={
              pageStyle(currentTheme, currentSettings).mainMenuContainer
            }
          />
        )}
      </View>
    </View>
  );
};
export default Page;

const pageStyle = (theme, settings, hasContextualMenu) => {
  return StyleSheet.create({
    mainMenuContainer: {
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
    contextMenuContainer: {
      borderStyle: 'solid',
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: 10,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      padding: 2,
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    },
    clockContainerStyle: {
      flexDirection: 'row',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 8,
      borderBottomRightRadius: hasContextualMenu ? 0 : 8,
      borderBottomLeftRadius: hasContextualMenu ? 0 : 8,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
  });
};
