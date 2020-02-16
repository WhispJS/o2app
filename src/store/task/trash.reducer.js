import {ADD_ELEMENT_TO_TRASH} from '../trash/trash.actiontype';

export const initialTrashState = {
  elements: [],
};

const trashReducer = (state = initialTrashState, action) => {
  switch (action.type) {
    case ADD_ELEMENT_TO_TRASH:
      return {...state, elements: [...state.elements, action.payload.data]};
    default:
      return state;
  }
};

export default trashReducer;
