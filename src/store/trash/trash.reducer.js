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
      const now = new Date();
      const trashedElement = {
        key: 'trashed-' + action.payload.element.id,
        type: action.payload.type,
        element: action.payload.element,
        dateDeleted: now,
      };
      return {...state, elements: [...state.elements, trashedElement]};
    case EMPTY_TRASH:
      return {
        ...state,
        elements: [],
      };
    case RESTORE_ELEMENT:
      return {
        ...state,
        elements: state.elements.filter(
          element => element.element.id !== action.payload.element.id,
        ),
      };
    default:
      return state;
  }
};

export default trashReducer;
