import {
  ADD_ELEMENT_TO_TRASH,
  EMPTY_TRASH,
  RESTORE_ELEMENT,
} from '../trash/trash.actiontype';

export const addElementToTrash = element => ({
  type: ADD_ELEMENT_TO_TRASH,
  payload: {data: element},
});

export const emptyTrash = () => ({
  type: EMPTY_TRASH,
});

export const restoreElement = element => ({
  type: RESTORE_ELEMENT,
  payload: {data: element},
});
