import { SAVE_SETTINGS, SAVE_THEME } from "./themes.actiontype";

const initialThemeState = {};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case SAVE_SETTINGS:
      return { ...state, currentSettings: action.payload.data };
    case SAVE_THEME:
      return { ...state, currentTheme: action.payload.data };
    default:
      return state;
  }
};

export default themeReducer;
