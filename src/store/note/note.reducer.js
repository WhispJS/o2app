const initialNoteState = {
  notes: [{title: 'Important', content: "Remember what's important"}],
};
export const emptyNote = {
  title: '',
  content: '',
  linked: [
    {key: 'note', data: []},
    {key: 'event', data: []},
    {key: 'task', data: []},
  ],
};
const noteReducer = (state = initialNoteState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default noteReducer;
