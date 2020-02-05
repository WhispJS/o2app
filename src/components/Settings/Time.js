import React from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  textStyles,
  timeFormats,
  containerStyles,
  settingsFields,
  buttonStyles,
} from '../../config/style';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';

const TimeSettings = ({updateSettings}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <>
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
            onPress={() => updateSettings(settingsFields.timeFormat, item.key)}
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
    </>
  );
};

export default TimeSettings;
