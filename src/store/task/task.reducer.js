const initialTaskState = {
  tasks: [
    {title: 'first rule', content: 'do no harm'},
    {
      title: 'in order to always get better',
      content: 'always learn new things',
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
