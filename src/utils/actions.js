import {goTo} from '../store/navigation/navigation.actions';
import {paths} from '../config/routes';
import {deleteElement} from '../store/element/element.actions';
import {restoreElement} from '../store/trash/trash.actions';

export const shareAction = (type, element, dispatch) => ({key: 'share'});

export const editAction = (type, element, dispatch) => ({
  key: 'edit',
  onPress: () =>
    dispatch(goTo(paths[type], {id: element.id, type, isEditing: true})),
});

export const viewAction = (type, element, dispatch) => ({
  key: 'view',
  onPress: () =>
    dispatch(goTo(paths[type], {id: element.id, type, isEditing: true})),
});

export const deleteAction = (type, element, dispatch) => ({
  key: 'delete',
  onPress: () => dispatch(deleteElement(element, type)),
});

export const addAction = (type, dispatch, otherParams) => ({
  key: 'add',
  onPress: () =>
    dispatch(
      goTo(paths[type], {
        ...(otherParams && otherParams),
        type,
        isEditing: true,
      }),
    ),
});

export const restoreAction = (type, element, dispatch) => ({
  key: 'restore',
  text: 'Restore',
  onPress: () => dispatch(restoreElement(element, type)),
});
