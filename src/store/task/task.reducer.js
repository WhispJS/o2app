import {themeFields} from '../../config/style';
import {
  CREATE_OR_UPDATE_TASK,
  UPDATE_CURRENT_TASK,
  DELETE_TASK,
  SWITCH_STATE_TASK,
  LINK_ELEMENT_TO_TASK,
  UNLINK_ELEMENT_TO_TASK,
  UPDATE_VERSION_TASKS,
} from './task.actiontype';
import {
  createOrUpdateElements,
  createElementFromModel,
} from '../../utils/elementsOperations';

export const taskModel = {
  version: '0.0',
  name: themeFields.items.task,
  fields: [
    {name: 'title', required: true, default: ''},
    {name: 'content', required: false, default: ''},
    {name: 'done', required: true, default: false},
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

export const emptyTask = createElementFromModel(taskModel);

const initialTaskState = {
  tasks: [],
  currentTask: emptyTask,
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_TASK:
      const {elementList, newElement} = createOrUpdateElements(
        state.tasks,
        action.payload.data,
      );
      return {
        ...state,
        tasks: elementList,
        currentTask: newElement,
      };
    case UPDATE_CURRENT_TASK:
      return {...state, currentTask: action.payload.data};
    case SWITCH_STATE_TASK:
      const switchedTask = {
        ...action.payload.data,
        done: !action.payload.data.done,
      };
      const resultSwitchState = createOrUpdateElements(
        state.tasks,
        switchedTask,
      );
      return {
        ...state,
        tasks: resultSwitchState.elementList,
        currentTask: resultSwitchState.newElement,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.data.id),
        currentTask: emptyTask,
      };
    case LINK_ELEMENT_TO_TASK:
      const taskLink = {
        ...action.payload.task,
        linked: {
          ...action.payload.task.linked,
          [action.payload.type]: [
            ...action.payload.task.linked[action.payload.type],
            action.payload.element,
          ],
        },
      };
      const resultLink = createOrUpdateElements(state.tasks, taskLink);
      return {
        ...state,
        tasks: resultLink.elementList,
        currentTask: resultLink.newElement,
      };
    case UNLINK_ELEMENT_TO_TASK:
      const taskUnlink = {
        ...action.payload.task,
        linked: {
          ...action.payload.task.linked,
          [action.payload.type]: action.payload.task.linked[
            action.payload.type
          ].filter(task => task.id !== action.payload.element.id),
        },
      };
      const resultUnlink = createOrUpdateElements(state.tasks, taskUnlink);
      return {
        ...state,
        tasks: resultUnlink.elementList,
        currentTask: resultUnlink.newElement,
      };
    case UPDATE_VERSION_TASKS:
      return {
        ...state,
        tasks: state.tasks.map(task => createElementFromModel(taskModel, task)),
        currentTask: createElementFromModel(taskModel, state.currentTask),
      };
    default:
      return state;
  }
};

export default taskReducer;
