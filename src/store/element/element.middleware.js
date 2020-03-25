import {RESTORE_ELEMENT} from '../trash/trash.actiontype';
import {UPDATE_VERSION} from '../update/update.actiontypes';
import {
  createOrUpdateElement,
  unlinkElements,
  linkElements,
} from './element.actions';
import {DELETE_ELEMENT} from './element.actiontypes';
import {findById} from './element.service';
import {elementTypes} from '../../config/meta';

const dealWithLinks = store => action => linkFunction => {
  Object.values(elementTypes).forEach(type => {
    const findElementById = findById(store.getState().elements[type + 's']);
    action.payload.element.linked[type].forEach(id => {
      const linkedElement = findElementById(id).element;
      store.dispatch(
        linkFunction(
          action.payload.element,
          action.payload.type,
          linkedElement,
          type,
        ),
      );
    });
  });
};

const elementMiddleware = store => next => action => {
  switch (action.type) {
    case DELETE_ELEMENT:
      dealWithLinks(store)(action)(unlinkElements);
      break;
    case RESTORE_ELEMENT:
      store.dispatch(
        createOrUpdateElement(action.payload.element, action.payload.type),
      );
      dealWithLinks(store)(action)(linkElements);
      break;
    case UPDATE_VERSION:
      break;
  }
  return next(action);
};

export default elementMiddleware;
