import {getPhotoInfoList} from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const thumbnailsRender = getPhotoInfoList();

thumbnailsRender.forEach(({url, likes, comments}) =>{
  const newRender = pictureTemplate.cloneNode(true);

  newRender.querySelector('.picture__img').src = url;
  newRender.querySelector('.picture__likes').textContent = likes;
  newRender.querySelector('.picture__comments').textContent = comments.length;

  pictureListFragment.append(newRender);
});

picturesContainer.append(pictureListFragment);
