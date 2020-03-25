const uuid = require('react-native-uuid');

export const createOrUpdate = list => element => {
  let result = {list, element};
  if (element.id) {
    if (list.filter(elem => elem.id === element.id).length > 0) {
      // This is when the element is updated
      result.list = list.map(elem => (elem.id === element.id ? element : elem));
    } else {
      // this is when the element is restored
      result.list = [...list, element];
    }
  } else {
    // finally this is when the element is new
    result.element = {...element, id: uuid.v4()};
    result.list = [...list, result.element];
  }
  return result;
};

export const findById = list => id => {
  let result = {list, element: null};
  console.log({list});
  result.element = list.filter(elem => elem.id === id)[0];
  return result;
};
