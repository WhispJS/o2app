import React from "react";
import { Text } from "react-native";
import { textStyles } from "../config/style";
import Page from "../components/Page/Page";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../store/themes/themes.selectors";

const NotePage = () => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <Page theme={currentTheme}>
      <Text style={textStyles(currentTheme).general}>NotePage</Text>
    </Page>
  );
};

export default NotePage;
