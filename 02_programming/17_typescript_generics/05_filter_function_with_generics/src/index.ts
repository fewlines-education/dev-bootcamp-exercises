function filterFor(array, predicate) {
  const resultArray = [];

  for (const element of array) {
    if (predicate(element)) {
      resultArray.push(element)
    }
  }

  return resultArray;
}

export { filterFor }
