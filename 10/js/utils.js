const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomListElement = (array) =>{
  const previousElements = [];
  return () => {
    let currentElement = array[getRandomInt(0, array.length - 1)];
    while (previousElements.includes(currentElement)) {
      currentElement = array[getRandomInt(0, array.length - 1)];
    }
    previousElements.push(currentElement);
    return currentElement;
  };
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomListElement, debounce };
