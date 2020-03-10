import {themeFields} from '../../config/style';
import {DELETE_EVENT} from '../event/event.actiontype';

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
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          event => event.id !== action.payload.data.id,
        ),
        currentEvent: emptyEvent,
      };
    default:
      return state;
  }
};

export default eventReducer;
