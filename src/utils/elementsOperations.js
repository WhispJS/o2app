export const createOrUpdateElements = (elementList, newElement, id) => {
  let returnedData = {elementList, newElement};
  if (newElement.id) {
    returnedData.elementList = elementList.map(element =>
      element.id === newElement.id ? newElement : element,
    );
  } else {
    returnedData.newElement = {...newElement, id};
    returnedData.elementList = [...elementList, returnedData.newElement];
  }
  return returnedData;
};
