import { StyleSheet } from "react-native";

export const general = {
  menuButtonSize: 25,
  settingsIconSize: 20
};

export const icons = {
  type: "font-awesome",
  note: "pencil",
  task: "check-square",
  event: "calendar",
  settings: "cog",
  profile: "user-circle-o",
  leftHanded: "chevron-left",
  neutral: "chevron-down",
  rightHanded: "chevron-right"
};

export const menuStyles = {
  leftHanded: "leftHanded",
  rightHanded: "rightHanded",
  neutral: "neutral"
};

export const defaultTheme = {
  note: {
    backgroundColor: "#ff6e61",
    textColor: "#ff6e61"
  },
  event: {
    backgroundColor: "#9eff61",
    textColor: "#9eff61"
  },
  task: {
    backgroundColor: "#ffe761",
    textColor: "#ffe761"
  }
};

export const settingsFields = {
  menuStyle: "menuStyle",
  menu: "menu"
};

export const themeFields = {
  backgroundColor: "backgroundColor",
  textColor: "textColor"
};

export const defaultSettings = {
  menuStyle: menuStyles.neutral,
  menu: [
    { key: "note" },
    { key: "task" },
    { key: "event" },
    { key: "settings" },
    { key: "profile" }
  ]
};

export const containerStyles = (settings, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      flexDirection:
        settings.menuStyle === menuStyles.neutral ? "column" : "row",
      justifyContent: "center"
    },
    main: {
      flex: settings.menuStyle === menuStyles.neutral ? 7 : 4
    },
    header: {
      flexDirection: "row",
      padding: 10,
      marginBottom: 20
    },
    menu: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#fff",
      borderRadius: 10,
      padding: 10,
      margin: 10
    },
    data: {
      flex: 1,
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 10,
      padding: 30,
      margin: 10,
      marginBottom: 20
    },
    note: {
      borderColor: theme.note[themeFields.backgroundColor]
    },
    task: {
      borderColor: theme.task[themeFields.backgroundColor]
    },
    event: {
      borderColor: theme.event[themeFields.backgroundColor]
    },
    settingsFlatList: {
      flex: 1,
      justifyContent: "space-between"
    }
  });

export const buttonStyles = theme =>
  StyleSheet.create({
    menu: {
      borderRadius: 200,
      borderStyle: "solid",
      borderWidth: 1,
      padding: 20,
      margin: 5,
      alignItems: "center",
      backgroundColor: "#a6a6a6",
      borderColor: "grey"
    },
    note: {
      backgroundColor: theme.note[themeFields.backgroundColor],
      borderColor: theme.note[themeFields.backgroundColor]
    },
    task: {
      backgroundColor: theme.task[themeFields.backgroundColor],
      borderColor: theme.task[themeFields.backgroundColor]
    },
    event: {
      backgroundColor: theme.event[themeFields.backgroundColor],
      borderColor: theme.event[themeFields.backgroundColor]
    },
    settingsItem: {
      padding: 10,
      flexDirection: "row"
    },
    settingsItemSelected: {
      backgroundColor: "white"
    }
  });

export const textStyles = theme =>
  StyleSheet.create({
    general: {
      color: "#fff"
    },
    header: {
      fontSize: 22
    },
    note: {
      color: theme.note[themeFields.textColor]
    },
    task: {
      color: theme.task[themeFields.textColor]
    },
    event: {
      color: theme.event[themeFields.textColor]
    },
    settingsItem: {
      color: "white",
      paddingRight: 10
    },
    settingsItemSelected: {
      color: "black",
      paddingRight: 10
    }
  });
