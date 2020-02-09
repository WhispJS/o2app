const taskMiddleware = store => next => action => {
  switch (action.type) {
  }
  return next(action);
};
export default taskMiddleware;
