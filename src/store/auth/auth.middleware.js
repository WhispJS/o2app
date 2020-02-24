const authMiddleware = store => next => action => {
  switch (action.type) {
  }
  return next(action);
};
export default authMiddleware;
