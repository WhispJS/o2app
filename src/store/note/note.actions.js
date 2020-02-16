import {
  CREATE_OR_UPDATE_NOTE,
  UPDATE_CURRENT_NOTE,
  DELETE_NOTE,
} from './note.actiontype';
import {themeFields} from '../../config/style';

export const createOrUpdateNote = note => ({
  type: CREATE_OR_UPDATE_NOTE,
  payload: {data: note},
});

export const updateCurrentNote = note => ({
  type: UPDATE_CURRENT_NOTE,
  payload: {data: note},
});

export const deleteNote = note => ({
  type: DELETE_NOTE,
  payload: {data: note, elementType: themeFields.items.note},
});
