const themesMiddleware = store => next => action => {
  return next(action);
};
export default themesMiddleware;
