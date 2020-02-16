// Takes two array as entry
// Return an array that has the data from array given as second argument but in the order of the first array
// Both arrays must have matching {key:} for this to work
export const reorderData = (order, data = []) => {
  const sortByOrderArrayGiven = (a, b) => {
    const flattenedOrderArray = order.map(item => item.key);
    if (flattenedOrderArray.indexOf(a.key) === -1) {
      return 1;
    }
    return (
      flattenedOrderArray.indexOf(a.key) - flattenedOrderArray.indexOf(b.key)
    );
  };
  return data.sort(sortByOrderArrayGiven);
};
