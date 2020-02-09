const noteMiddleware = store => next => action => {
  switch (action.type) {
  }
  return next(action);
};
export default noteMiddleware;
