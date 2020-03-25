import {
  addAction,
  editAction,
  shareAction,
  deleteAction,
  restoreAction,
} from '../utils/actions';

export const homeActions = (type, element, dispatch) => [
  addAction(type, dispatch),
  editAction(type, element, dispatch),
  shareAction(type, element, dispatch),
  deleteAction(type, element, dispatch),
];

export const elementPageActions = (type, element, dispatch) => [
  editAction(type, element, dispatch),
  shareAction(type, element, dispatch),
  deleteAction(type, element, dispatch),
];

export const trashActions = (type, element, dispatch) => [
  restoreAction(type, element, dispatch),
];
