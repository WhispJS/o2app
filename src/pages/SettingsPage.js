import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Picker} from 'react-native';
import {
  textStyles,
  menuStyles,
  settingsFields,
  icons,
  general,
  buttonStyles,
  containerStyles,
  defaultTheme,
  themeFields,
  timeFormats,
} from '../config/style';
import Page from '../components/Page/Page';
import {
  getCurrentTheme,
  getCurrentSettings,
  getLoadedThemes,
} from '../store/themes/themes.selectors';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import {saveTheme, saveSettings} from '../store/themes/themes.actions';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import Themes from '../components/Settings/Themes';

const SettingsPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [editTheme, setEditTheme] = useState(false);
  const userThemes = useSelector(getLoadedThemes);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTheme(currentTheme);
  }, []);

  const updateSettings = (field, value) => {
    dispatch(saveSettings({...currentSettings, [field]: value}));
  };

  const onChangeTheme = theme => {
    setSelectedTheme(theme);
  };

  const onEditThemePressed = () => {
    setEditTheme(!editTheme);
  };
  return (
    <>
      <Page theme={currentTheme}>
        {editTheme ? (
          <>
            <Button title="Close" onPress={onEditThemePressed} />
            <Themes />
          </>
        ) : (
          <>
            <Text style={textStyles(currentTheme).general}>Settings</Text>
            <Text style={textStyles(currentTheme).general}>Time format</Text>
            <FlatList
              horizontal={true}
              data={[
                {key: timeFormats.twelveHours, text: '12-hour'},
                {key: timeFormats.twentyfourHours, text: '24-hour'},
              ]}
              contentContainerStyle={
                containerStyles(currentSettings, currentTheme).settingsFlatList
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    updateSettings(settingsFields.timeFormat, item.key)
                  }
                  style={[
                    currentSettings[settingsFields.timeFormat] === item.key &&
                      buttonStyles(currentTheme).settingsItemSelected,
                    buttonStyles(currentTheme).settingsItem,
                  ]}>
                  <Text
                    style={
                      currentSettings[settingsFields.timeFormat] === item.key
                        ? textStyles(currentTheme).settingsItemSelected
                        : textStyles(currentTheme).settingsItem
                    }>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Text style={textStyles(currentTheme).general}>Menu Position</Text>
            <FlatList
              horizontal={true}
              data={[
                {
                  key: menuStyles.leftHanded,
                  icon: icons.leftHanded,
                  text: 'Left',
                },
                {key: menuStyles.neutral, icon: icons.neutral, text: 'Neutral'},
                {
                  key: menuStyles.rightHanded,
                  icon: icons.rightHanded,
                  text: 'Right',
                },
              ]}
              contentContainerStyle={
                containerStyles(currentSettings, currentTheme).settingsFlatList
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    updateSettings(settingsFields.menuStyle, item.key)
                  }
                  style={[
                    currentSettings.menuStyle === item.key &&
                      buttonStyles(currentTheme).settingsItemSelected,
                    buttonStyles(currentTheme).settingsItem,
                  ]}>
                  <Text
                    style={
                      currentSettings.menuStyle === item.key
                        ? textStyles(currentTheme).settingsItemSelected
                        : textStyles(currentTheme).settingsItem
                    }>
                    {item.text}
                  </Text>
                  <Icon
                    color={
                      currentSettings.menuStyle === item.key
                        ? textStyles(currentTheme).settingsItemSelected.color
                        : textStyles(currentTheme).settingsItem.color
                    }
                    name={item.icon}
                    type={icons.type}
                    size={general.settingsIconSize}
                  />
                </TouchableOpacity>
              )}
            />
            <Text style={textStyles(currentTheme).general}>Menu Order</Text>
            <View style={{height: 250}}>
              <DraggableFlatList
                data={currentSettings.menu}
                renderItem={({item, index, drag, isActive}) => (
                  <TouchableOpacity
                    style={[
                      buttonStyles(currentTheme).settingsItem,
                      buttonStyles(currentTheme)[item.key],
                    ]}
                    onLongPress={drag}>
                    <Icon
                      name={icons[item.key]}
                      type={icons.type}
                      size={general.settingsIconSize}
                      color={
                        textStyles(currentTheme).settingsItemSelected.color
                      }
                    />
                    <Text>{' ' + item.key}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({data}) =>
                  updateSettings(settingsFields.menu, data)
                }
              />
            </View>
            <Text style={textStyles(currentTheme).general}>Themes</Text>
            <Picker
              selectedValue={selectedTheme.id ? selectedTheme.id : -1}
              style={textStyles(currentTheme).general}
              onValueChange={value => onChangeTheme(value)}>
              {userThemes.map((theme, index) => (
                <Picker.Item
                  key={index}
                  label={theme.name}
                  value={theme.id ? theme.id : -1}
                />
              ))}
            </Picker>
            <Button title="Edit current theme" onPress={onEditThemePressed} />
          </>
        )}
      </Page>
    </>
  );
};

export default SettingsPage;
