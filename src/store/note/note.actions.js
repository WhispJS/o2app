import {
  CREATE_OR_UPDATE_NOTE,
  UPDATE_CURRENT_NOTE,
  LINK_ELEMENT_TO_NOTE,
  UNLINK_ELEMENT_TO_NOTE,
  DELETE_NOTE,
  UPDATE_VERSION_NOTES,
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

export const linkElementToNote = (note, element, type) => ({
  type: LINK_ELEMENT_TO_NOTE,
  payload: {note, element, type},
});

export const unlinkElementToNote = (note, element, type) => ({
  type: UNLINK_ELEMENT_TO_NOTE,
  payload: {note, element, type},
});

export const updateVersionNotes = version => ({
  type: UPDATE_VERSION_NOTES,
  payload: {version},
});
