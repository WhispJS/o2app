const eventMiddleware = store => next => action => {
  switch (action.type) {
  }
  return next(action);
};
export default eventMiddleware;
