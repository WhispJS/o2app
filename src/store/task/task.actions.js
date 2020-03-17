import {
  CREATE_OR_UPDATE_TASK,
  UPDATE_CURRENT_TASK,
  DELETE_TASK,
  SWITCH_STATE_TASK,
  LINK_ELEMENT_TO_TASK,
  UNLINK_ELEMENT_TO_TASK,
  UPDATE_VERSION_TASKS,
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

export const switchStateTask = task => ({
  type: SWITCH_STATE_TASK,
  payload: {data: task},
});
export const deleteTask = task => ({
  type: DELETE_TASK,
  payload: {data: task, elementType: themeFields.items.task},
});

export const linkElementToTask = (task, element, type) => ({
  type: LINK_ELEMENT_TO_TASK,
  payload: {task, element, type},
});

export const unlinkElementToTask = (task, element, type) => ({
  type: UNLINK_ELEMENT_TO_TASK,
  payload: {task, element, type},
});

export const updateVersionTasks = version => ({
  type: UPDATE_VERSION_TASKS,
  payload: {version},
});
