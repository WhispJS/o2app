import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  textStyles,
  menuStyles,
  settingsFields,
  icons,
  general,
  buttonStyles,
  containerStyles,
  defaultSettings,
} from '../config/style';
import Page from '../components/Page/Page';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../store/themes/themes.selectors';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import {saveTheme, saveSettings} from '../store/themes/themes.actions';
import SortableList from '../components/SortableList/SortableList';
import DraggableFlatList from 'react-native-draggable-flatlist';

const SettingsPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  const updateSettings = (field, value) => {
    dispatch(saveSettings({...currentSettings, [field]: value}));
  };

  const updateTheme = (field, value) => {
    dispatch(saveTheme({...currentTheme, [field]: value}));
  };

  return (
    <>
      <Page theme={currentTheme}>
        <View>
          <Text style={textStyles(currentTheme).general}>Settings</Text>
        </View>
        <View>
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
        </View>
        <View>
          <Text style={textStyles(currentTheme).general}>Menu Order</Text>
          <View style={{height: 500}}>
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
                    color={currentTheme.general.backgroundColor}
                  />
                  <Text>{' ' + item.key}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `draggable-item-${item.key}`}
              onDragEnd={({data}) => updateSettings(settingsFields.menu, data)}
            />
          </View>
        </View>
      </Page>
    </>
  );
};

export default SettingsPage;
