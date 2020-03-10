import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import {goTo} from '../../store/navigation/navigation.actions';
import {paths} from '../../config/routes';
import {
  containerStyles,
  textStyles,
  icons,
  themeFields,
  general,
  settingsFields,
  timeFormats,
} from '../../config/style';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';
import moment from 'moment';

const Clock = ({containerStyle}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const [time, setTime] = useState(moment().format(currentSettings.timeFormat));
  const [date, setDate] = useState(moment().format('dddd MMMM Do YYYY'));
  const dispatch = useDispatch();

  const handleClickTime = () => {
    dispatch(goTo(paths.home));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(currentSettings.timeFormat));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSettings]);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleClickTime}>
      <View
        style={[
          containerStyles(currentSettings, currentTheme).clockPart,
          containerStyles(currentSettings, currentTheme).clockIcon,
        ]}>
        <Icon
          name={icons.home}
          type={icons.type}
          size={general.clockIconSize}
          color={
            currentTheme.colors[themeFields.items.general][
              themeFields.styles.mainColor
            ]
          }
        />
      </View>
      <View
        style={[
          containerStyles(currentSettings, currentTheme).clockPart,
          containerStyles(currentSettings, currentTheme).time,
        ]}>
        <Text
          style={[
            textStyles(currentTheme).general,
            textStyles(currentTheme).clockTime,
          ]}>
          {time}
        </Text>
        <Text
          style={[
            textStyles(currentTheme).general,
            textStyles(currentTheme).clock,
          ]}>
          {date}
        </Text>
      </View>
      <View
        style={[
          containerStyles(currentSettings, currentTheme).clockPart,
          containerStyles(currentSettings, currentTheme).clockInfo,
        ]}>
        <Text
          style={[
            textStyles(currentTheme).general,
            textStyles(currentTheme).clock,
          ]}>
          {currentSettings[settingsFields.timeZone]}
        </Text>
        <Text
          style={[
            textStyles(currentTheme).general,
            textStyles(currentTheme).clock,
          ]}>
          {currentSettings[settingsFields.timeFormat] ===
          timeFormats.twelveHours
            ? '12-hours'
            : '24-hours'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Clock;
