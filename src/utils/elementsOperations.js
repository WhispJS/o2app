export const createOrUpdateElements = (elementList, newElement, id) => {
  let returnedData = {elementList, newElement};
  const uuid = require('react-native-uuid');
  id = id ? id : uuid.v4();
  if (newElement.id) {
    // This is when the element is updated
    if (elementList.filter(elem => elem.id === newElement.id).length > 0) {
      returnedData.elementList = elementList.map(element =>
        element.id === newElement.id ? newElement : element,
      );
    } else {
      // this is when the element is restored
      returnedData.elementList = [...elementList, returnedData.newElement];
    }
  } else {
    // finally this is when the element is new
    returnedData.newElement = {...newElement, id};
    returnedData.elementList = [...elementList, returnedData.newElement];
  }
  return returnedData;
};

export const createElementFromModel = (model, elementToUpdate) => {
  let element = {};

  model.fields.forEach(field => {
    if (!field.fields) {
      element = {
        ...element,
        [field.name]:
          elementToUpdate && elementToUpdate[field.name]
            ? elementToUpdate[field.name]
            : field.default,
      };
    } else {
      field.fields.forEach(fieldField => {
        element = {
          ...element,
          [field.name]: {
            ...element[field.name],
            [fieldField.name]:
              elementToUpdate &&
              elementToUpdate[field.name] &&
              elementToUpdate[field.name][fieldField.name]
                ? elementToUpdate[field.name][fieldField.name]
                : fieldField.default,
          },
        };
      });
    }
  });
  return element;
};
