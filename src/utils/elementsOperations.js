export const createOrUpdateElements = (elementList, newElement, id) => {
  let returnedData = {elementList, newElement};
  if (newElement.id) {
    // This is when the element is updated
    if (elementList.filter(elem => elem.id, newElement.id).length > 0) {
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
