import {photoInfoList} from './data.js';

const COMMENTS_TO_VIEW = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const commentsLoader = document.querySelector('.social__comments-loader.comments-loader');
const commentsCount = document.querySelector('.social__comment-count');
const bodyElement = document.body;
const picturesContainer = document.querySelector('.pictures');
const closePictureButton = document.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comments');
let commentsShown = 0;
let comments;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsShown = 0;
  comments = [];
};

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape'){
    closeBigPicture();
  }
};

const onCloseButton = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const createComment = ({avatar, name, message}) =>{
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = '<img class="social__picture" src="" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text"></p>';
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_TO_VIEW;

  if(commentsShown >= comments.length){
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < commentsShown; i++){
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderClick = () => renderComments();

const renderPictureDetails = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  renderPictureDetails(data);
};

const renderBigPicture = () => {
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail){
      return;
    }
    const picture = photoInfoList.find(
      (item) => item.id === Number(thumbnail.dataset.thumbnailId)
    );
    comments = Array.from(picture.comments);
    showBigPicture(picture);
    renderComments(comments);
  });
};

closePictureButton.addEventListener('click', onCloseButton);

renderBigPicture();
