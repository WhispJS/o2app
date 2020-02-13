import {themeFields} from '../../config/style';

export const emptyNote = {
  title: '',
  content: '',
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};
const initialNoteState = {
  notes: [
    {
      ...emptyNote,
      id: 1,
      title: 'Important',
      content: "Remember what's important",
    },
  ],
};
const noteReducer = (state = initialNoteState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default noteReducer;
