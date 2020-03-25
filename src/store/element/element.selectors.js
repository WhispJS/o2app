import {elementTypes} from '../../config/meta';

export const getElementsForType = type => state => state.elements[type + 's'];
export const getElements = state =>
  Object.values(elementTypes).reduce(
    (acc, type) => ({...acc, [type]: getElementsForType(type)(state)}),
    {},
  );
export const getCurrentElement = state => state.elements.currentElement;
export const getCurrentType = state => state.elements.currentType;
