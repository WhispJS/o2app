import React, {useState} from 'react';
import {Text, Picker, StyleSheet, TouchableOpacity} from 'react-native';
import {
  settingsFields,
  menuStyles,
  icons,
  timeFormats,
  themeFields,
  general,
} from '../config/style';
import Page from '../components/Page/Page';
import {
  getCurrentTheme,
  getCurrentSettings,
  getLoadedThemes,
} from '../store/themes/themes.selectors';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
  saveSettings,
  saveTheme,
  addTheme,
} from '../store/themes/themes.actions';
import Themes from '../components/Settings/Themes';
import {View} from 'react-native';
import OrderList from '../components/Settings/OrderList';
import ButtonGroupSettings from '../components/Settings/ButtonGroupSettings';
import {
  setContextualMenu,
  removeContextMenu,
  goTo,
} from '../store/navigation/navigation.actions';
import {paths} from '../config/routes';
import {getPageParams} from '../store/navigation/navigation.selectors';

const SettingsPage = () => {
  const params = useSelector(getPageParams);
  const menuPositions = [
    {
      key: menuStyles.leftHanded,
      text: 'Left',
    },
    {key: menuStyles.neutral, text: 'Neutral'},
    {
      key: menuStyles.rightHanded,
      text: 'Right',
    },
  ];
  const formats = [
    {key: timeFormats.twelveHours, text: '12h'},
    {key: timeFormats.twentyfourHours, text: '24h'},
  ];
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const userThemes = useSelector(getLoadedThemes);
  const dispatch = useDispatch();

  const updateSettings = (field, value) => {
    dispatch(saveSettings({...currentSettings, [field]: value}));
  };

  const onChangeTheme = themeId => {
    const theme = userThemes[themeId];
    dispatch(saveTheme(theme));
  };

  const onEditThemePressed = isEditing => {
    dispatch(goTo(paths.settings, {isEditing: isEditing}));
    if (isEditing) {
      dispatch(setContextualMenu(themesContextualMenu));
    } else {
      dispatch(removeContextMenu());
    }
  };

  const onAddThemePressed = () => {
    onEditThemePressed(true);
    dispatch(addTheme());
  };

  const ThemePicker = ({style, themes}) => {
    return (
      <Picker
        selectedValue={
          currentTheme
            ? themes.map(theme => theme.id).indexOf(currentTheme.id)
            : -1
        }
        style={[settingsStyle(currentTheme).picker, style]}
        onValueChange={value => onChangeTheme(value)}>
        {themes.map((theme, index) => (
          <Picker.Item key={index} label={theme.name} value={index} />
        ))}
      </Picker>
    );
  };

  const themesContextualMenu = [
    {
      key: 'close',
      theme: 'other',
      onPress: () => onEditThemePressed(false),
    },
    {key: 'add', theme: 'other', onPress: () => onAddThemePressed()},
  ];

  return (
    <>
      <Page theme={currentTheme}>
        {params.isEditing ? (
          <>
            <Text style={settingsStyle(currentTheme).pageTitle}>
              Edit theme
            </Text>
            <View style={settingsStyle(currentTheme).inline}>
              <Text style={settingsStyle(currentTheme).header}>
                Select theme
              </Text>
              <ThemePicker style={{flex: 6}} themes={userThemes} />
            </View>
            <Themes />
          </>
        ) : (
          <>
            <Text style={settingsStyle(currentTheme).pageTitle}>Settings</Text>
            <ButtonGroupSettings
              header={
                <Text style={settingsStyle(currentTheme).header}>
                  Time Format
                </Text>
              }
              data={formats}
              settingsField={settingsFields.timeFormat}
              updateSettings={updateSettings}
              buttonStyle={settingsStyle(currentTheme).buttonStyle}
              selectedButtonStyle={
                settingsStyle(currentTheme).selectedButtonStyle
              }
              textStyle={settingsStyle(currentTheme).textStyle}
              selectedTextStyle={settingsStyle(currentTheme).selectedTextStyle}
              containerStyle={settingsStyle(currentTheme).containerStyle}
            />
            <ButtonGroupSettings
              header={
                <Text style={settingsStyle(currentTheme).header}>
                  Menu Position
                </Text>
              }
              data={menuPositions}
              settingsField={settingsFields.menuStyle}
              updateSettings={updateSettings}
              buttonStyle={settingsStyle(currentTheme).buttonStyle}
              selectedButtonStyle={
                settingsStyle(currentTheme).selectedButtonStyle
              }
              textStyle={settingsStyle(currentTheme).textStyle}
              selectedTextStyle={settingsStyle(currentTheme).selectedTextStyle}
              containerStyle={settingsStyle(currentTheme).containerStyle}
            />
            <Text style={settingsStyle(currentTheme).header}>Order</Text>
            <View style={settingsStyle(currentTheme).orderSettings}>
              <View style={settingsStyle(currentTheme).orderList}>
                <Text style={settingsStyle(currentTheme).header}>Menu</Text>
                <OrderList
                  data={currentSettings.menu}
                  onDragEnd={({data}) =>
                    updateSettings(settingsFields.menu, data)
                  }
                />
              </View>
              <View style={settingsStyle(currentTheme).orderList}>
                <Text style={settingsStyle(currentTheme).header}>
                  Home screen
                </Text>
                <OrderList
                  data={currentSettings.cardOrder}
                  onDragEnd={({data}) =>
                    updateSettings(settingsFields.cardOrder, data)
                  }
                />
              </View>
            </View>
            <View style={settingsStyle(currentTheme).inline}>
              <Text style={settingsStyle(currentTheme).header}>Themes</Text>
              <ThemePicker style={{flex: 6}} themes={userThemes} />
              <TouchableOpacity
                style={settingsStyle(currentTheme).inlineButton}
                onPress={() => onEditThemePressed(true)}>
                <Icon
                  name={icons.edit}
                  type={icons.type}
                  size={general.settingsIconSize}
                  color={
                    currentTheme.colors[themeFields.items.general][
                      themeFields.styles.mainColor
                    ]
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={settingsStyle(currentTheme).inlineButton}
                onPress={onAddThemePressed}>
                <Icon
                  name={icons.add}
                  type={icons.type}
                  size={general.settingsIconSize}
                  color={
                    currentTheme.colors[themeFields.items.general][
                      themeFields.styles.mainColor
                    ]
                  }
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Page>
    </>
  );
};

const settingsStyle = theme => {
  return StyleSheet.create({
    container: {},
    pageTitle: {
      fontSize: 22,
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    header: {
      width: 100,
      fontSize: 15,
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    inline: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inlineButton: {
      flex: 1,
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
      marginLeft: 5,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    orderSettings: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    orderList: {
      flex: 1,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
    },
    textStyle: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    selectedButtonStyle: {
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    selectedTextStyle: {
      color:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
    },
    containerStyle: {
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    picker: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
  });
};
export default SettingsPage;
