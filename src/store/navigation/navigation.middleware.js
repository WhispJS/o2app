import {GO_TO} from './navigation.actiontype';
import {removeContextMenu} from '../navigation/navigation.actions';
import {changeCurrentElement, linkElements} from '../element/element.actions';
import {elementTypes} from '../../config/meta';
import {emptyElement} from '../element/element.reducer';
import {findById} from '../element/element.service';

const navigationMiddleware = store => next => action => {
  switch (action.type) {
    case GO_TO:
      const path = action.payload.page;
      //Remove context menu only if we went to a new page
      if (store.getState().navigation.currentPage !== path) {
        store.dispatch(removeContextMenu());
      }
      // If we are going to an element page, we want to set the current element according to params
      if (Object.values(elementTypes).includes(path)) {
        const params = action.payload.params;
        if (params.linkedId) {
          // it means we are creating a new element linked to the current element
          const findByIdForType = findById(
            store.getState().elements[params.linkedType + 's'],
          );
          store.dispatch(
            linkElements(
              emptyElement[params.type],
              params.type,
              findByIdForType(params.linkedId).element,
              params.linkedType,
            ),
          );
        } else {
          // it means we simply want to edit an exisiting element or create a new one
          store.dispatch(changeCurrentElement(params.id, params.type));
        }
      }
      break;
  }
  return next(action);
};
export default navigationMiddleware;
