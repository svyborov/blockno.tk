export const remove = (array, index) => {
  if (index !== -1) {
    return array.splice(index, 1)[0];
  }
};
