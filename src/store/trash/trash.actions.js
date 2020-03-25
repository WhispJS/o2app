import {
  ADD_ELEMENT_TO_TRASH,
  EMPTY_TRASH,
  RESTORE_ELEMENT,
} from '../trash/trash.actiontype';

export const addElementToTrash = (element, type) => ({
  type: ADD_ELEMENT_TO_TRASH,
  payload: {element, type},
});

export const emptyTrash = () => ({
  type: EMPTY_TRASH,
});

export const restoreElement = (element, type) => ({
  type: RESTORE_ELEMENT,
  payload: {element, type},
});
