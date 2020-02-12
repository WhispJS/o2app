const navigationMiddleware = store => next => action => {
  switch (action.type) {
  }
  return next(action);
};
export default navigationMiddleware;
