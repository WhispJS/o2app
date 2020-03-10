import {
  ADD_ELEMENT_TO_TRASH,
  EMPTY_TRASH,
  RESTORE_ELEMENT,
} from '../trash/trash.actiontype';

export const initialTrashState = {
  elements: [],
};

const trashReducer = (state = initialTrashState, action) => {
  switch (action.type) {
    case ADD_ELEMENT_TO_TRASH:
      return {...state, elements: [...state.elements, action.payload.data]};
    case EMPTY_TRASH:
      return {
        ...state,
        elements: [],
      };
    case RESTORE_ELEMENT:
      return {
        ...state,
        elements: state.elements.filter(
          element => element.element.id !== action.payload.data.element.id,
        ),
      };
    default:
      return state;
  }
};

export default trashReducer;
