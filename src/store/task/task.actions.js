import {
  CREATE_OR_UPDATE_TASK,
  UPDATE_CURRENT_TASK,
  DELETE_TASK,
} from './task.actiontype';
import {themeFields} from '../../config/style';

export const createOrUpdateTask = task => ({
  type: CREATE_OR_UPDATE_TASK,
  payload: {data: task},
});

export const updateCurrentTask = task => ({
  type: UPDATE_CURRENT_TASK,
  payload: {data: task},
});

export const deleteTask = task => ({
  type: DELETE_TASK,
  payload: {data: task, elementType: themeFields.items.task},
});
