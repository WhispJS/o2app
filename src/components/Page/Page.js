import React from 'react';
import {View} from 'react-native';
import Menu from '../Menu/Menu';
import {containerStyles, menuStyles} from '../../config/style';
import {useSelector} from 'react-redux';
import {
  getCurrentTheme,
  getCurrentSettings,
} from '../../store/themes/themes.selectors';
import Clock from '../Clock/Clock';

const Page = ({children}) => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);

  return (
    <View style={containerStyles(currentSettings, currentTheme).outerContainer}>
      <Clock />
      <View style={containerStyles(currentSettings, currentTheme).container}>
        {currentSettings.menuStyle === menuStyles.leftHanded && (
          <Menu theme={currentTheme} />
        )}

        <View style={containerStyles(currentSettings, currentTheme).main}>
          {children}
        </View>
        {currentSettings.menuStyle !== menuStyles.leftHanded && (
          <Menu theme={currentTheme} />
        )}
      </View>
    </View>
  );
};
export default Page;
