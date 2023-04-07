import { getRandomListElement } from './utils.js';
import { data } from './gallery.js';
import { renderThumbnails } from './thumbnail-render.js';
import { debounce } from './utils.js';

const FIRST_PICTURE_INDEX = 1;
const RANDOM_PHOTOS_AMOUNT = 10;
const filtersBlock = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures.container');
const picturesFromContainer = picturesContainer.children;
const RERENDER_DELAY = 500;

const cleanPicturesFromContainer = () => {
  for(let i = picturesFromContainer.length - 1; i > FIRST_PICTURE_INDEX; i--) {
    picturesFromContainer[i].remove();
  }
};

const applyDefault = () => {
  renderThumbnails(data);
};

const applyRandomFilter = () => {
  const randomPhotos = Array.from({length: RANDOM_PHOTOS_AMOUNT}, getRandomListElement(data));
  renderThumbnails(randomPhotos);
};

const applyDiscussedFilter = () => {
  const copyOfData = data.slice();

  copyOfData.forEach(
    (photo) => {
      photo['commentsAmount'] = photo.comments.length;
    }
  );

  const sortedData = copyOfData.sort(
    (photoA, photoB) => photoA['commentsAmount'] > photoB['commentsAmount']
      ? -1
      : 1
  );
  renderThumbnails(sortedData);
};

const filtersMap = {
  'filter-default': applyDefault,
  'filter-random': applyRandomFilter,
  'filter-discussed': applyDiscussedFilter
};

filtersBlock.addEventListener('click', (evt) => {
  filterButtons.forEach((button) =>{
    button.classList.remove('img-filters__button--active');
  });

  const filterButton = evt.target.closest('.img-filters__button');
  if (!filterButton){
    return;
  }
  cleanPicturesFromContainer();
  filterButton.classList.add('img-filters__button--active');
  debounce((() => filtersMap[filterButton.id]()), RERENDER_DELAY)();
});
