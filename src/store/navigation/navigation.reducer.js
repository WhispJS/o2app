import {
  GO_TO,
  GO_BACK,
  SET_CONTEXTUAL_MENU,
  REMOVE_CONTEXTUAL_MENU,
} from './navigation.actiontype';

const initialNavigationState = {
  currentPage: 'home',
  params: null,
  history: [],
  contextualMenu: null,
};

const navigationReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case GO_TO:
      const newPage = action.payload.data ? action.payload.data : 'home';
      return {
        ...state,
        currentPage: newPage,
        params: action.payload.params,
        history: [...state.history, newPage],
      };
    case GO_BACK:
      return {
        ...state,
        currentPage: state.history[state.history.length - 1],
        history: state.history.slice(-1, 1),
      };
    case SET_CONTEXTUAL_MENU:
      return {
        ...state,
        contextualMenu: action.payload.data,
      };
    case REMOVE_CONTEXTUAL_MENU:
      return {
        ...state,
        contextualMenu: null,
      };
    default:
      return state;
  }
};

export default navigationReducer;
