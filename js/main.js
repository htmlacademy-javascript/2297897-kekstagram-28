const NAMES = [
  'Антон',
  'Егор',
  'Марина',
  'Елена',
  'Иван',
  'Вероника',
  'Светлана',
  'Николай',
  'Евгений',
  'Гарфилд',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Функция по получению целого рандомного числа
const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Функция, по получению уникального числа

function getUniqueInteger (min, max){
  const previousGenerated = [];
  return function (){
    let currentInteger = getRandomInt(min, max);
    while(previousGenerated.includes(currentInteger)){
      currentInteger = getRandomInt(min, max);
    }
    previousGenerated.push(currentInteger);
    return currentInteger;
  };
}

const getUniqueId = getUniqueInteger(1, 25);

//Функция получения индекса аватара

function getAvatarUrl (min, max){
  const avatarIndex = String(getRandomInt(min, max));
  return `img/avatar-${avatarIndex}.url`;
}

//Функция создания объекта

function getPhotoInfo (){
  return{
    id: getUniqueId(),
    avatar: getAvatarUrl(1, 6),
    message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
    name: NAMES[getRandomInt(0, NAMES.length - 1)],
  };
}

Array.from({length: 25}, getPhotoInfo);
