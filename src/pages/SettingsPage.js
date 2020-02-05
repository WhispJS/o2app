import React, {useState, useEffect} from 'react';
import {Text, Picker, StyleSheet, TouchableOpacity} from 'react-native';
import {
  textStyles,
  defaultTheme,
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
import {Button, Divider, ButtonGroup, Icon} from 'react-native-elements';
import {
  saveSettings,
  saveTheme,
  addTheme,
} from '../store/themes/themes.actions';
import Themes from '../components/Settings/Themes';
import {View} from 'react-native';
import OrderList from '../components/Settings/OrderList';
import ButtonGroupSettings from '../components/Settings/ButtonGroupSettings';

const SettingsPage = () => {
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
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [editTheme, setEditTheme] = useState(false);
  const userThemes = useSelector(getLoadedThemes);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTheme(currentTheme);
  }, []);

  const updateSettings = (field, value) => {
    dispatch(saveSettings({...currentSettings, [field]: value}));
  };

  const onChangeTheme = themeId => {
    const theme = userThemes[themeId];
    setSelectedTheme(theme);
    dispatch(saveTheme(theme));
  };

  const onEditThemePressed = () => {
    setEditTheme(!editTheme);
  };

  const onAddThemePressed = () => {
    setEditTheme(!editTheme);
    const newTheme = {...currentTheme, id: userThemes.length + 1};
    dispatch(saveTheme(newTheme));
    dispatch(addTheme(newTheme));
  };

  const ThemePicker = ({style}) => {
    return (
      <Picker
        selectedValue={selectedTheme ? selectedTheme.id : -1}
        style={[settingsStyle(currentTheme).picker, style]}
        onValueChange={value => onChangeTheme(value)}>
        {userThemes.map((theme, index) => (
          <Picker.Item key={index} label={theme.name} value={index} />
        ))}
      </Picker>
    );
  };

  return (
    <>
      <Page theme={currentTheme}>
        {editTheme ? (
          <>
            <ThemePicker />
            <Themes />
            <Button title="Close" onPress={onEditThemePressed} />
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
                <Text style={settingsStyle(currentTheme).header}>Card</Text>
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
              <ThemePicker style={{flex: 6}} />
              <TouchableOpacity
                style={settingsStyle(currentTheme).inlineButton}
                onPress={onEditThemePressed}>
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
