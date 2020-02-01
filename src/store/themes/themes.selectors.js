import {defaultTheme, defaultSettings} from '../../config/style';

export const getCurrentTheme = state => state.themes.currentTheme;

export const getCurrentSettings = state => state.themes.currentSettings;

export const getLoadedThemes = state => state.themes.themes;
