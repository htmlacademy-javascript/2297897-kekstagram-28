const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;
const MAX_TAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}/i;
const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeOverlayButton = document.querySelector('.img-upload__cancel');
const scaleControlPanel = document.querySelector('.img-upload__scale');
const biggerButtonElement = scaleControlPanel.querySelector('.scale__control--bigger');
const smallerButtonElement = scaleControlPanel.querySelector('.scale__control--smaller');
const scalePanelValue = scaleControlPanel.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
let currentScaleValue = parseInt(scalePanelValue.value, 10);
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const ERROR_TAGS_MESSAGE = 'Неправильно введены хештеги';
const sendFormButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape' && !isTextFieldFocused()){
    hideModal();
  }
};

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scalePanelValue.value = `${value}%`;
};

const onBiggerButtonClick = () => {
  currentScaleValue += SCALE_STEP;
  if(currentScaleValue > MAX_SCALE_VALUE){
    currentScaleValue = MAX_SCALE_VALUE;
  }
  scaleImage(currentScaleValue);
};

const onSmallerButtonClick = () => {
  currentScaleValue -= SCALE_STEP;
  if(currentScaleValue < MIN_SCALE_VALUE){
    currentScaleValue = MIN_SCALE_VALUE;
  }
  scaleImage(currentScaleValue);
};

const disableSendButton = () => pristine.validate() ? sendFormButton.removeAttribute('disabled') : sendFormButton.setAttribute('disabled', true);

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  uploadOverlay.addEventListener('input', disableSendButton);
};

function hideModal () {
  /*Для поднятия*/
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  uploadOverlay.removeEventListener('input', disableSendButton);
}

uploadButton.addEventListener('change', openModal);
closeOverlayButton.addEventListener('click', hideModal);

const isValidTagsCount = (value) => value.length <= MAX_TAGS_COUNT;

const hasUniqueTags = (value) => value.length === new Set(value).size;

const isValidTags = (value) => VALID_SYMBOLS.test(value);

const validateTags = (value) => {
  const fixedTags = value
    .toLowerCase()
    .replace(/ +/g, ' ').trim()
    .split(' ');
  return isValidTagsCount(fixedTags) && hasUniqueTags(fixedTags) && fixedTags.every(isValidTags);
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  ERROR_TAGS_MESSAGE
);

sendFormButton.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
