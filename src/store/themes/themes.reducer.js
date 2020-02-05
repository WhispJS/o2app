import {
  SAVE_SETTINGS,
  SAVE_THEME,
  ADD_THEME,
  REMOVE_THEME,
} from './themes.actiontype';
import {
  defaultSettings,
  defaultLightTheme,
  defaultDarkTheme,
} from '../../config/style';

const initialThemeState = {
  themes: [defaultLightTheme, defaultDarkTheme],
  currentTheme: defaultLightTheme,
  currentSettings: defaultSettings,
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case SAVE_SETTINGS:
      return {...state, currentSettings: action.payload.data};
    case SAVE_THEME:
      return {
        ...state,
        currentTheme: action.payload.data,
        themes: state.themes.map(theme =>
          theme.id === action.payload.data.id ? action.payload.data : theme,
        ),
      };
    case ADD_THEME:
      return {...state, themes: [...state.themes, action.payload.data]};
    case REMOVE_THEME:
      return {
        ...state,
        themes: state.themes.filter(
          theme => theme.id && theme.id !== action.payload.data.id,
        ),
      };
    default:
      return state;
  }
};

export default themeReducer;
