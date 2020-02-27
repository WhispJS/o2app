import {
  ADD_ELEMENT_TO_TRASH,
  DELETE_ELEMENT_FOREVER,
  RESTORE_ELEMENT,
} from '../trash/trash.actiontype';

export const addElementToTrash = element => ({
  type: ADD_ELEMENT_TO_TRASH,
  payload: {data: element},
});

export const deleteElementForever = element => ({
  type: DELETE_ELEMENT_FOREVER,
  payload: {data: element},
});

export const restoreElement = element => ({
  type: RESTORE_ELEMENT,
  payload: {data: element},
});
