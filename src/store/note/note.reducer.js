import {themeFields} from '../../config/style';
import {
  CREATE_OR_UPDATE_NOTE,
  UPDATE_CURRENT_NOTE,
  DELETE_NOTE,
  LINK_ELEMENT_TO_NOTE,
  UNLINK_ELEMENT_TO_NOTE,
  UPDATE_VERSION_NOTES,
} from './note.actiontype';
import {
  createOrUpdateElements,
  createElementFromModel,
} from '../../utils/elementsOperations';

export const noteModel = {
  version: '0.0',
  name: themeFields.items.note,
  fields: [
    {name: 'title', required: true, default: ''},
    {name: 'content', required: false, default: ''},
    {name: 'attachments', required: true, default: []},
    {
      name: 'linked',
      required: true,
      fields: [
        {
          name: themeFields.items.note,
          required: true,
          default: [],
        },
        {
          name: themeFields.items.task,
          required: true,
          default: [],
        },
        {
          name: themeFields.items.event,
          required: true,
          default: [],
        },
      ],
    },
  ],
};

export const emptyNote = createElementFromModel(noteModel);

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
    case LINK_ELEMENT_TO_NOTE:
      const noteLink = {
        ...action.payload.note,
        linked: {
          ...action.payload.note.linked,
          [action.payload.type]: [
            ...action.payload.note.linked[action.payload.type],
            action.payload.element,
          ],
        },
      };
      const resultLink = createOrUpdateElements(state.notes, noteLink);
      return {
        ...state,
        notes: resultLink.elementList,
        currentNote: resultLink.newElement,
      };

    case UNLINK_ELEMENT_TO_NOTE:
      const noteUnlink = {
        ...action.payload.note,
        linked: {
          ...action.payload.note.linked,
          [action.payload.type]: action.payload.note.linked[
            action.payload.type
          ].filter(note => note.id !== action.payload.element.id),
        },
      };
      const resultUnlink = createOrUpdateElements(state.notes, noteUnlink);
      return {
        ...state,
        notes: resultUnlink.elementList,
        currentNote: resultUnlink.newElement,
      };
    case UPDATE_VERSION_NOTES:
      return {
        ...state,
        notes: state.notes.map(note => createElementFromModel(noteModel, note)),
        currentNote: createElementFromModel(noteModel, state.currentNote),
      };
    default:
      return state;
  }
};

export default noteReducer;
