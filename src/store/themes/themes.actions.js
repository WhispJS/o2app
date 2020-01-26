import { SAVE_SETTINGS, SAVE_THEME } from "./themes.actiontype";

// settings is an object containing the settings to be saved
// See defaultSettings in style.js for how it is supposed to be structured
export const saveSettings = settings => ({
  type: SAVE_SETTINGS,
  payload: { data: settings }
});

// settings is an object containing the settings to be saved
// See defaultSettings in style.js for how it is supposed to be structured
export const saveTheme = theme => ({
  type: SAVE_THEME,
  payload: { data: theme }
});
