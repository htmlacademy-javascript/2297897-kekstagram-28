const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const renderThumbnails = (data) => {
  data.forEach(({url, description, likes, comments, id}) =>{
    const newRender = pictureTemplate.cloneNode(true);

    newRender.querySelector('.picture__img').src = url;
    newRender.querySelector('.picture__img').alt = description;
    newRender.querySelector('.picture__likes').textContent = likes;
    newRender.querySelector('.picture__comments').textContent = comments.length;
    newRender.dataset.thumbnailId = id;
    pictureListFragment.append(newRender);
  });

  picturesContainer.append(pictureListFragment);
};

export {renderThumbnails};
