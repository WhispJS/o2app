import {
  CREATE_OR_UPDATE_ELEMENT,
  UPDATE_MODEL,
  CHANGE_CURRENT_ELEMENT,
  LINK_ELEMENTS,
  UNLINK_ELEMENTS,
  DELETE_ELEMENT,
  TASK_SWITCH_STATE,
} from './element.actiontypes';

// GENERAL
export const createOrUpdateElement = (element, type) => ({
  type: CREATE_OR_UPDATE_ELEMENT,
  payload: {element, type},
});

export const updateModel = type => ({type: UPDATE_MODEL, payload: {type}});

export const changeCurrentElement = (id, type) => ({
  type: CHANGE_CURRENT_ELEMENT,
  payload: {id, type},
});

export const linkElements = (element1, type1, element2, type2) => ({
  type: LINK_ELEMENTS,
  payload: {element1, type1, element2, type2},
});

export const unlinkElements = (element1, type1, element2, type2) => ({
  type: UNLINK_ELEMENTS,
  payload: {element1, type1, element2, type2},
});

export const deleteElement = (element, type) => ({
  type: DELETE_ELEMENT,
  payload: {element, type},
});

// NOTE

// TASK
export const task_switchState = task => ({
  type: TASK_SWITCH_STATE,
  payload: {task},
});
// EVENT
