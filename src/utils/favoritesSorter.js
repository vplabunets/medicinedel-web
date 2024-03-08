export const favoritesSorter = (array) => {
  return [...array].sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite === true ? -1 : 1));
};
