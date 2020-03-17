import {StyleSheet} from 'react-native';

export const general = {
  menuButtonSize: 20,
  settingsIconSize: 20,
  clockIconSize: 30,
  cardIconSize: 20,
};

export const icons = {
  type: 'font-awesome',
  note: 'book',
  task: 'check-square',
  event: 'calendar',
  settings: 'cog',
  profile: 'user-circle-o',
  leftHanded: 'chevron-left',
  neutral: 'chevron-down',
  rightHanded: 'chevron-right',
  home: 'home',
  share: 'send',
  copy: 'copy',
  edit: 'pencil',
  add: 'plus',
  back: 'arrow-up',
  forward: 'arrow-down',
  close: 'save',
  attachment: 'paperclip',
  link: 'link',
  delete: 'trash',
  trash: 'trash',
  done: 'check-square-o',
  checked: 'check-square-o',
  undone: 'square-o',
  unchecked: 'square-o',
};

export const menuStyles = {
  leftHanded: 'leftHanded',
  rightHanded: 'rightHanded',
  neutral: 'neutral',
};

//Relative to moment.js
export const timeFormats = {
  twelveHours: 'hh:mm A',
  twentyfourHours: 'HH:mm',
};

export const settingsFields = {
  menuStyle: 'menuStyle',
  menu: 'menu',
  cardOrder: 'cardOrder',
  timeZone: 'timeZone',
  timeFormat: 'timeFormat',
};

export const themeFields = {
  name: 'name',
  colors: 'colors',
  items: {
    note: 'note',
    event: 'event',
    task: 'task',
    other: 'other',
    general: 'general',
  },
  styles: {
    mainColor: 'main',
    secondaryColor: 'secondary',
  },
};

export const defaultDarkTheme = {
  id: 1,
  name: 'Dark',
  colors: {
    [themeFields.items.general]: {
      [themeFields.styles.secondaryColor]: '#4D4D4D',
      [themeFields.styles.mainColor]: '#0E8BFB',
    },
    [themeFields.items.note]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#5DB2FF',
    },
    [themeFields.items.event]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#FF8750',
    },
    [themeFields.items.task]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#709C34',
    },
    [themeFields.items.other]: {
      [themeFields.styles.mainColor]: '#5B5A59',
      [themeFields.styles.secondaryColor]: '#8B8B8B',
    },
  },
};

export const defaultLightTheme = {
  id: 2,
  name: 'Light',
  colors: {
    [themeFields.items.general]: {
      [themeFields.styles.mainColor]: '#0E8BFB',
      [themeFields.styles.secondaryColor]: '#FFF9F9',
    },
    [themeFields.items.note]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#5DB2FF',
    },
    [themeFields.items.event]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#FF8750',
    },
    [themeFields.items.task]: {
      [themeFields.styles.mainColor]: '#E3E3E3',
      [themeFields.styles.secondaryColor]: '#709C34',
    },
    [themeFields.items.other]: {
      [themeFields.styles.mainColor]: '#5B5A59',
      [themeFields.styles.secondaryColor]: '#8B8B8B',
    },
  },
};

export const defaultLightTheme2 = {
  id: 3,
  name: 'Light 2',
  colors: {
    [themeFields.items.general]: {
      [themeFields.styles.mainColor]: '#602010',
      [themeFields.styles.secondaryColor]: '#FFFCF3',
    },
    [themeFields.items.note]: {
      [themeFields.styles.mainColor]: '#5DB2FF',
      [themeFields.styles.secondaryColor]: '#1C324E',
    },
    [themeFields.items.event]: {
      [themeFields.styles.mainColor]: '#FF844C',
      [themeFields.styles.secondaryColor]: '#763E22',
    },
    [themeFields.items.task]: {
      [themeFields.styles.mainColor]: '#99C991',
      [themeFields.styles.secondaryColor]: '#426615',
    },
    [themeFields.items.other]: {
      [themeFields.styles.mainColor]: '#C5C2C3',
      [themeFields.styles.secondaryColor]: '#602010',
    },
  },
};
export const defaultSettings = {
  [settingsFields.menuStyle]: menuStyles.rightHanded,
  [settingsFields.menu]: [
    {key: 'note', theme: 'note'},
    {key: 'task', theme: 'task'},
    {key: 'event', theme: 'event'},
    {key: 'settings', theme: 'other'},
    {key: 'profile', theme: 'other'},
    {key: 'trash', theme: 'other'},
  ],
  [settingsFields.cardOrder]: [
    {key: 'note', theme: 'note'},
    {key: 'task', theme: 'task'},
    {key: 'event', theme: 'event'},
  ],
  [settingsFields.timeZone]: 'GMT+1',
  [settingsFields.timeFormat]: timeFormats.twentyfourHours,
};

export const containerStyles = (settings, theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
      flexDirection:
        settings.menuStyle === menuStyles.neutral ? 'column' : 'row',
      justifyContent: 'center',
      marginTop: 5,
    },
    outerContainer: {
      flex: 1,
      backgroundColor:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
      padding: 5,
    },
    main: {
      flex: settings.menuStyle === menuStyles.neutral ? 9 : 6,
      paddingLeft: settings.menuStyle === menuStyles.leftHanded ? 5 : 0,
      paddingRight: settings.menuStyle === menuStyles.rightHanded ? 5 : 0,
      paddingBottom: settings.menuStyle === menuStyles.neutral ? 5 : 0,
    },
    clockPart: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'stretch',
      justifyContent: 'space-evenly',
      padding: 10,
    },
    time: {
      flex: 6,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    clockInfo: {
      flex: 2,
    },
    settingsFlatList: {
      flex: 1,
      justifyContent: 'space-around',
    },
  });

export const buttonStyles = theme =>
  StyleSheet.create({
    note: {
      backgroundColor:
        theme.colors[themeFields.items.note][themeFields.styles.mainColor],
    },
    task: {
      backgroundColor:
        theme.colors[themeFields.items.task][themeFields.styles.mainColor],
    },
    event: {
      backgroundColor:
        theme.colors[themeFields.items.event][themeFields.styles.mainColor],
    },
    profile: {
      backgroundColor: '#a6a6a6',
    },
    settings: {
      backgroundColor: '#a6a6a6',
    },
    settingsItem: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingsItemSelected: {
      backgroundColor:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
  });

export const textStyles = theme =>
  StyleSheet.create({
    general: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
    },
    clock: {
      fontSize: 16,
    },
    clockTime: {
      fontSize: 30,
    },
    note: {
      color: theme.colors[themeFields.items.note][themeFields.styles.mainColor],
    },
    task: {
      color: theme.colors[themeFields.items.task][themeFields.styles.mainColor],
    },
    event: {
      color:
        theme.colors[themeFields.items.event][themeFields.styles.mainColor],
    },
    settingsItem: {
      color:
        theme.colors[themeFields.items.general][themeFields.styles.mainColor],
      paddingRight: 10,
    },
    settingsItemSelected: {
      color:
        theme.colors[themeFields.items.general][
          themeFields.styles.secondaryColor
        ],
      paddingRight: 10,
    },
  });
