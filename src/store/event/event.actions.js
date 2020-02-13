import {CREATE_OR_UPDATE_EVENT} from './event.actiontype';

export const createOrUpdateEvent = event => ({
  type: CREATE_OR_UPDATE_EVENT,
  payload: {data: event},
});
