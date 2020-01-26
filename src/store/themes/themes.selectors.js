import { defaultTheme, defaultSettings } from "../../config/style";

export const getCurrentTheme = state =>
  state.themes.currentTheme ? state.themes.currentTheme : defaultTheme;

export const getCurrentSettings = state =>
  state.themes.currentSettings ? state.themes.currentSettings : defaultSettings;
