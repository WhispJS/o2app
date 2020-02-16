import {themeFields} from '../../config/style';
import {
  CREATE_OR_UPDATE_NOTE,
  UPDATE_CURRENT_NOTE,
  DELETE_NOTE,
} from './note.actiontype';
import {createOrUpdateElements} from '../../utils/elementsOperations';

export const emptyNote = {
  title: '',
  content: '',
  attachments: [],
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};
const initialNoteState = {
  notes: [],
  currentId: 0,
  currentNote: emptyNote,
};
const noteReducer = (state = initialNoteState, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_NOTE:
      const id = action.payload.data.id ? state.currentId : state.currentId + 1;
      const {elementList, newElement} = createOrUpdateElements(
        state.notes,
        action.payload.data,
        id,
      );
      return {
        ...state,
        notes: elementList,
        currentNote: newElement,
        currentId: id,
      };
    case UPDATE_CURRENT_NOTE:
      return {...state, currentNote: action.payload.data};
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.data.id),
        currentNote: emptyNote,
      };
    default:
      return state;
  }
};

export default noteReducer;
