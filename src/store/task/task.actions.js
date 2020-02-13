import {CREATE_OR_UPDATE_TASK} from './task.actiontype';

export const createOrUpdateTask = task => ({
  type: CREATE_OR_UPDATE_TASK,
  payload: {data: task},
});
