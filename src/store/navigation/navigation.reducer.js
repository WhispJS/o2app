import { GO_TO, GO_BACK } from "./navigation.actiontype";

const initialNavigationState = {
  currentPage: "home",
  history: []
};

const navigationReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case GO_TO:
      return {
        ...state,
        currentPage: action.payload.data,
        history: [...state.history, action.payload.data]
      };
    case GO_BACK:
      return {
        ...state,
        currentPage: state.history[state.history.length - 1],
        history: state.history.slice(-1, 1)
      };
    default:
      return state;
  }
};

export default navigationReducer;
