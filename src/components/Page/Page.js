import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Menu from "../Menu/Menu";
import { containerStyles, textStyles, menuStyles } from "../../config/style";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentTheme,
  getCurrentSettings
} from "../../store/themes/themes.selectors";
import { goTo } from "../../store/navigation/navigation.actions";
import { paths } from "../../config/routes";

const Page = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toString());
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  const handleClickTime = () => {
    dispatch(goTo(paths.home));
  };
  return (
    <View style={containerStyles(currentSettings, currentTheme).container}>
      {currentSettings.menuStyle === menuStyles.leftHanded && (
        <Menu theme={currentTheme} />
      )}
      <View style={containerStyles(currentSettings, currentTheme).main}>
        <TouchableOpacity
          style={containerStyles(currentSettings, currentTheme).header}
          onPress={handleClickTime}
        >
          <Text
            style={[
              textStyles(currentTheme).general,
              textStyles(currentTheme).header
            ]}
          >
            {currentTime}
          </Text>
        </TouchableOpacity>
        <View style={containerStyles(currentSettings, currentTheme).content}>
          {children}
        </View>
      </View>
      {currentSettings.menuStyle !== menuStyles.leftHanded && (
        <Menu theme={currentTheme} />
      )}
    </View>
  );
};
export default Page;
