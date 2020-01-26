import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import {
  containerStyles,
  buttonStyles,
  icons,
  general,
  menuStyles,
  settingsFields,
  textStyles
} from "../../config/style";
import { useDispatch, useSelector } from "react-redux";
import { goTo } from "../../store/navigation/navigation.actions";
import {
  getCurrentTheme,
  getCurrentSettings
} from "../../store/themes/themes.selectors";
import { paths } from "../../config/routes";

const Menu = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  const dispatch = useDispatch();

  const handleMenuPress = path => {
    dispatch(goTo(path));
  };
  return (
    <View style={containerStyles(currentSettings, currentTheme).menu}>
      <FlatList
        horizontal={
          currentSettings[settingsFields.menuStyle] === menuStyles.neutral
        }
        data={currentSettings[settingsFields.menu]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              buttonStyles(currentTheme).menu,
              buttonStyles(currentTheme)[item.key]
            ]}
            onPress={() => handleMenuPress(paths[item.key])}
          >
            <Icon
              name={icons[item.key]}
              type={icons.type}
              size={general.menuButtonSize}
              color="black"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Menu;
