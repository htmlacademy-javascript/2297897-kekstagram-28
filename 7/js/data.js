import {getOrdinalInteger, getRandomInt, getRandomArrayElement} from './util.js';

const AMOUNT_OF_PHOTOS = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 12;
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
const DESCRIPTIONS = [
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Улыбка — единственный тренд в моде, который актуален всегда.',
  'Всегда начинайте свой день с хороших людей и кофе',
  'Я точно знаю, кто я, и я чертовски горжусь этим.',
  'Никогда не знаешь, что у тебя есть, пока не уберешься в доме.',
  'Еще один прекрасный день, испорченный обязанностями.',
];

const getCommentId = getOrdinalInteger();
const getPhotoId = getOrdinalInteger();
const getPhotoNum = getOrdinalInteger();

const getComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const getPhotoInfo = () =>({
  id: getPhotoId(),
  url: `photos/${getPhotoNum()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    {length:getRandomInt(1, MAX_COMMENTS_COUNT)}, getComment
  ),
});

const getPhotoInfoList = () => Array.from({length: AMOUNT_OF_PHOTOS}, getPhotoInfo);

const photoInfoList = getPhotoInfoList();

export{photoInfoList};
