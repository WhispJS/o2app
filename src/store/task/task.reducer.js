import {themeFields} from '../../config/style';

export const emptyTask = {
  title: '',
  content: '',
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};

const initialTaskState = {
  tasks: [
    {
      ...emptyTask,
      id: 1,
      title: 'first rule',
      content: 'do no harm',
      done: true,
    },
    {
      ...emptyTask,
      id: 2,
      title: 'in order to always get better',
      content: 'always learn new things',
      done: false,
    },
  ],
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default taskReducer;
