import {CREATE_OR_UPDATE_NOTE} from './note.actiontype';

export const createOrUpdateNote = note => ({
  type: CREATE_OR_UPDATE_NOTE,
  payload: {data: note},
});
