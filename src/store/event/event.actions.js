import {CREATE_OR_UPDATE_EVENT, DELETE_EVENT} from './event.actiontype';
import {themeFields} from '../../config/style';

export const createOrUpdateEvent = event => ({
  type: CREATE_OR_UPDATE_EVENT,
  payload: {data: event},
});

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  payload: {data: event, elementType: themeFields.items.event},
});
