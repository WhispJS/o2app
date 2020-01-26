import React from "react";
import { Text } from "react-native";
import { textStyles } from "../config/style";
import Page from "../components/Page/Page";
import { getCurrentTheme } from "../store/themes/themes.selectors";

const SettingsPage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>SettingsPage</Text>
    </Page>
  );
};

export default SettingsPage;
