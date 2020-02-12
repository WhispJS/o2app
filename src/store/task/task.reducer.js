import {themeFields} from '../../config/style';

const initialTaskState = {
  tasks: [
    {id: 1, title: 'first rule', content: 'do no harm'},
    {
      id: 2,
      title: 'in order to always get better',
      content: 'always learn new things',
    },
  ],
};

export const emptyTask = {
  title: '',
  content: '',
  linked: [
    {key: themeFields.items.note, data: []},
    {key: themeFields.items.event, data: []},
    {key: themeFields.items.task, data: []},
  ],
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default taskReducer;
