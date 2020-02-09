import {
  GO_TO,
  GO_BACK,
  SET_CONTEXTUAL_MENU,
  REMOVE_CONTEXTUAL_MENU,
} from './navigation.actiontype';

export const goTo = page => ({
  type: GO_TO,
  payload: {data: page},
});

export const goBack = () => ({
  type: GO_BACK,
});

export const setContextualMenu = contextualMenu => ({
  type: SET_CONTEXTUAL_MENU,
  payload: {data: contextualMenu},
});

export const removeContextMenu = () => ({type: REMOVE_CONTEXTUAL_MENU});
