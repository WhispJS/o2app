import {
  CREATE_OR_UPDATE_EVENT,
  DELETE_EVENT,
  LINK_ELEMENT_TO_EVENT,
  UNLINK_ELEMENT_TO_EVENT,
  UPDATE_VERSION_EVENTS,
} from './event.actiontype';
import {themeFields} from '../../config/style';

export const createOrUpdateEvent = event => ({
  type: CREATE_OR_UPDATE_EVENT,
  payload: {data: event},
});

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  payload: {data: event, elementType: themeFields.items.event},
});

export const linkElementToEvent = (event, element, type) => ({
  type: LINK_ELEMENT_TO_EVENT,
  payload: {event, element, type},
});

export const unlinkElementToEvent = (event, element, type) => ({
  type: UNLINK_ELEMENT_TO_EVENT,
  payload: {event, element, type},
});

export const updateVersionEvents = version => ({
  type: UPDATE_VERSION_EVENTS,
  payload: {version},
});
