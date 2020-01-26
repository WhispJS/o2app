const navigationMiddleware = store => next => action => {
  return next(action);
};
export default navigationMiddleware;
