import {getUniqueInteger, getRandomInt} from './util.js';

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

//Функция создания объекта

const getUniqueId = getUniqueInteger();

const getPhotoInfo = () =>({
  id: getUniqueId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.url`,
  message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const getPhotoInfoList = () => Array.from({length: 25}, getPhotoInfo);

export{getPhotoInfoList};
