const shuffleArray = (array) => {
  for(let i = array.length - 1; i > 0; i--){
    const current = array[i];
    const random = Math.floor(Math.random() * (i + 1));

    array[i] = array[random];
    array[random] = current;
  }
  return array;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { shuffleArray, debounce };
