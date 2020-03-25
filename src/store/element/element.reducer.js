import {
  createElementFromModel,
  updateElementToModel,
  models,
} from '../../utils/models';
import {
  CREATE_OR_UPDATE_ELEMENT,
  CHANGE_CURRENT_ELEMENT,
  DELETE_ELEMENT,
  UPDATE_MODEL,
  LINK_ELEMENTS,
  UNLINK_ELEMENTS,
  TASK_SWITCH_STATE,
} from './element.actiontypes';
import {createOrUpdate, findById} from './element.service';
import {elementTypes} from '../../config/meta';

export const emptyElement = {
  [elementTypes.note]: createElementFromModel(models[elementTypes.note]),
  [elementTypes.task]: createElementFromModel(models[elementTypes.task]),
  [elementTypes.event]: createElementFromModel(models[elementTypes.event]),
};

const initialElementState = {
  [elementTypes.note + 's']: [],
  [elementTypes.task + 's']: [],
  [elementTypes.event + 's']: [],
  currentElement: emptyElement[elementTypes.note],
  currentType: elementTypes.note,
};

const elementReducer = (state = initialElementState, action) => {
  switch (action.type) {
    //GENERAL
    case CREATE_OR_UPDATE_ELEMENT:
      return createOrUpdateElement(state)(
        action.payload.element,
        action.payload.type,
      );
    case LINK_ELEMENTS:
      return linkElements(true)(state)(
        action.payload.element1,
        action.payload.element2,
        action.payload.type1,
        action.payload.type2,
      );
    case UNLINK_ELEMENTS:
      return linkElements(false)(state)(
        action.payload.element1,
        action.payload.element2,
        action.payload.type1,
        action.payload.type2,
      );
    case CHANGE_CURRENT_ELEMENT:
      return {
        ...state,
        currentElement: action.payload.id
          ? findElementById(state)(action.payload.id, action.payload.type)
          : emptyElement[action.payload.type],
        currentType: action.payload.type,
      };
    case DELETE_ELEMENT:
      return {
        ...state,
        [action.payload.type + 's']: state[action.payload.type + 's'].filter(
          element => element.id !== action.payload.element.id,
        ),
      };
    case UPDATE_MODEL:
      return {
        ...state,
        [action.payload.type + 's']: state[action.payload.type + 's'].map(
          element => updateElementToModel(models[action.payload.type], element),
        ),
      };
    // NOTE
    // TASK
    case TASK_SWITCH_STATE:
      return switchState(state)(action.payload.task);
    // EVENT
    default:
      return state;
  }
};

// GENERAL
const createOrUpdateElement = state => (element, type) => {
  const createOrUpdateForType = createOrUpdate(state[type + 's']);
  const result = createOrUpdateForType(element);
  return {...state, [type + 's']: result.list, currentElement: result.element};
};

const findElementById = state => (id, type) => {
  const findByIdForType = findById(state[type + 's']);
  return findByIdForType(id).element;
};

const linkElements = isLinking => state => (
  element1,
  element2,
  type1,
  type2,
) => {
  console.log({element1, element2});
  const createOrUpdateForType1 = createOrUpdate(state[type1 + 's']);
  const createOrUpdateForType2 = updatedState =>
    createOrUpdate(updatedState[type2 + 's']);
  const updatedElement1 = {
    ...element1,
    linked: {
      ...element1.linked,
      [type2]: isLinking
        ? [...element1.linked[type2], element2.id]
        : element1.linked[type2].filter(id => id !== element2.id),
    },
  };
  const firstUpdate = createOrUpdateForType1(updatedElement1);
  state = {
    ...state,
    [type1 + 's']: firstUpdate.list,
  };
  const updatedElement2 = {
    ...element2,
    linked: {
      ...element2.linked,
      [type1]: isLinking
        ? [...element2.linked[type1], firstUpdate.element.id]
        : element2.linked[type1].filter(id => id !== firstUpdate.element.id),
    },
  };
  const secondUpdate = createOrUpdateForType2(state)(updatedElement2);
  state = {
    ...state,
    [type2 + 's']: secondUpdate.list,
    currentElement: firstUpdate.element,
    currentType: type1,
  };
  return state;
};

// TASK
const switchState = state => task => {
  const updatedTask = {
    ...task,
    done: !task.done,
  };
  const {list} = createOrUpdate(state[elementTypes.task + 's'], updatedTask);
  return {...state, [elementTypes.task + 's']: list};
};

export default elementReducer;
