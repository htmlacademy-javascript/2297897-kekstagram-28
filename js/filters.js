import { shuffleArray } from './utils.js';
import { data } from './gallery.js';
import { debouncedRenderThumbnails } from './thumbnail-render.js';

const RANDOM_PHOTOS_AMOUNT = 10;
const filtersBlock = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const copyOfData = data.slice();

const cleanPicturesFromContainer = () => {
  document.querySelectorAll('a.picture').forEach((picture) => picture.remove());
};

const applyDefault = () => {
  debouncedRenderThumbnails(data);
};

const applyRandomFilter = () => {
  const randomPhotos = shuffleArray(copyOfData)
    .slice(0, RANDOM_PHOTOS_AMOUNT);
  debouncedRenderThumbnails(randomPhotos);
};

const applyDiscussedFilter = () => {
  const sortedData = copyOfData.sort(
    (photoA, photoB) => photoA.comments.length > photoB.comments.length
      ? -1
      : 1
  );
  debouncedRenderThumbnails(sortedData);
};

const filtersMap = {
  'filter-default': applyDefault,
  'filter-random': applyRandomFilter,
  'filter-discussed': applyDiscussedFilter
};

filtersBlock.addEventListener('click', (evt) => {
  const filterButton = evt.target.closest('.img-filters__button');
  if (!filterButton){
    return;
  }

  filterButtons.forEach((button) =>{
    button.classList.remove('img-filters__button--active');
  });

  filterButton.classList.add('img-filters__button--active');
  cleanPicturesFromContainer();
  const filterPhotos = () => filtersMap[filterButton.id]();
  filterPhotos();
});
