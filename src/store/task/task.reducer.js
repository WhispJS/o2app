import {themeFields} from '../../config/style';
import {
  CREATE_OR_UPDATE_TASK,
  UPDATE_CURRENT_TASK,
  DELETE_TASK,
  SWITCH_STATE_TASK,
} from './task.actiontype';
import {createOrUpdateElements} from '../../utils/elementsOperations';

export const emptyTask = {
  title: '',
  content: '',
  done: false,
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};

const initialTaskState = {
  tasks: [],
  currentId: 0,
  currentTask: emptyTask,
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_TASK:
      const id = action.payload.data.id ? state.currentId : state.currentId + 1;
      const {elementList, newElement} = createOrUpdateElements(
        state.tasks,
        action.payload.data,
        id,
      );
      return {
        ...state,
        tasks: elementList,
        currentTask: newElement,
        currentId: id,
      };
    case UPDATE_CURRENT_TASK:
      return {...state, currentTask: action.payload.data};
    case SWITCH_STATE_TASK:
      const taskState = action.payload.data;
      const switchedTask = {
        ...action.payload.data,
        done: !action.payload.data.done,
      };
      const result = createOrUpdateElements(
        state.tasks,
        switchedTask,
        switchedTask.id,
      );
      return {
        ...state,
        tasks: result.elementList,
        currentTask: result.newElement,
      };
      return state;
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.data.id),
        currentTask: emptyTask,
      };
    default:
      return state;
  }
};

export default taskReducer;
