import {
  SAVE_SETTINGS,
  SAVE_THEME,
  ADD_THEME,
  REMOVE_THEME,
} from './themes.actiontype';

export const saveSettings = settings => ({
  type: SAVE_SETTINGS,
  payload: {data: settings},
});

export const saveTheme = theme => ({
  type: SAVE_THEME,
  payload: {data: theme},
});

export const addTheme = theme => ({
  type: ADD_THEME,
  payload: {data: theme},
});

export const removeTheme = theme => ({
  type: REMOVE_THEME,
  payload: {data: theme},
});
