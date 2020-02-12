import {themeFields} from '../../config/style';

const initialEventState = {
  events: [{id: 1, content: 'test', title: 'test'}],
};

export const emptyEvent = {
  title: '',
  content: '',
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};
const eventReducer = (state = initialEventState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default eventReducer;
