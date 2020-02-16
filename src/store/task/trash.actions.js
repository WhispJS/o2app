import {ADD_ELEMENT_TO_TRASH} from '../trash/trash.actiontype';

export const addElementToTrash = element => ({
  type: ADD_ELEMENT_TO_TRASH,
  payload: {data: element},
});
