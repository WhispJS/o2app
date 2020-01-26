import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, Button } from "react-native";
import { containerStyles, textStyles } from "../config/style";
import Page from "../components/Page/Page";
import { useSelector } from "react-redux";
import {
  getCurrentTheme,
  getCurrentSettings
} from "../store/themes/themes.selectors";

const Main = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const currentSettings = useSelector(getCurrentSettings);
  return (
    <Page theme={currentTheme}>
      <FlatList
        data={[
          { key: "note", type: "note", data: [] },
          { key: "task", type: "task", data: ["first task", "second task"] },
          { key: "event", type: "event", data: ["event"] }
        ]}
        typeExtractor={item => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              containerStyles(currentSettings, currentTheme).data,
              containerStyles(currentSettings, currentTheme)[item.type]
            ]}
          >
            <Text
              style={[
                textStyles(currentTheme).general,
                textStyles(currentTheme)[item.type]
              ]}
            >
              {item.data.length
                ? `${item.data.length} ${item.type}${
                    item.data.length > 1 ? "s" : ""
                  }`
                : noDataText[item.type]}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Page>
  );
};

const noDataText = {
  note: "No note",
  event: "No event",
  task: "No task"
};

export default Main;
