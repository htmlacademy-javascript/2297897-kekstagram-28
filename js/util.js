const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getOrdinalInteger = () => {
  let currentInteger = 0;
  return function (){
    currentInteger++;
    return currentInteger;
  };
};

const getRandomArrayElement = (array) =>array[getRandomInt(0, array.length - 1)];

export {getRandomInt, getOrdinalInteger, getRandomArrayElement};
