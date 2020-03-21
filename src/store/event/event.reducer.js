import {themeFields} from '../../config/style';
import {
  createOrUpdateElements,
  createElementFromModel,
} from '../../utils/elementsOperations';
import {
  DELETE_EVENT,
  LINK_ELEMENT_TO_EVENT,
  UNLINK_ELEMENT_TO_EVENT,
  UPDATE_VERSION_EVENTS,
} from '../event/event.actiontype';

export const eventModel = {
  version: '0.0',
  name: themeFields.items.event,
  fields: [
    {name: 'title', required: true, default: ''},
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

export const emptyEvent = createElementFromModel(eventModel);

const initialEventState = {
  events: [emptyEvent],
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
    case LINK_ELEMENT_TO_EVENT:
      const eventLink = {
        ...action.payload.event,
        linked: {
          ...action.payload.event.linked,
          [action.payload.type]: [
            ...action.payload.event.event.linked[action.payload.type],
            action.payload.element,
          ],
        },
      };
      const resultLink = createOrUpdateElements(state.events, eventLink);
      return {
        ...state,
        events: resultLink.elementList,
        currentEvent: resultLink.newElement,
      };
    case UNLINK_ELEMENT_TO_EVENT:
      const eventUnlink = {
        ...action.payload.event,
        linked: {
          ...action.payload.event.linked,
          [action.payload.type]: action.payload.event.linked[
            action.payload.type
          ].filter(event => event.id !== action.payload.element.id),
        },
      };
      const resultUnlink = createOrUpdateElements(state.events, eventUnlink);
      return {
        ...state,
        events: resultUnlink.elementList,
        currentEvent: resultUnlink.newElement,
      };
    case UPDATE_VERSION_EVENTS:
      return {
        ...state,
        events: state.events.map(event =>
          createElementFromModel(eventModel, event),
        ),
        currentEvent: createElementFromModel(eventModel, state.currentEvent),
      };
    default:
      return state;
  }
};

export default eventReducer;
