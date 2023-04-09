import { addRescaleListeners, deleteRescaleListeners, resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import {showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_TAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TAGS_MESSAGE = 'Неправильно введены хештеги';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeOverlayButton = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
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

const disableSendButton = () => pristine.validate()
  ? sendFormButton.removeAttribute('disabled')
  : sendFormButton.setAttribute('disabled', true);

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeOverlayButton.addEventListener('click', hideModal);
  hashtagsField.addEventListener('input', disableSendButton);
  addRescaleListeners();
};

function hideModal () {
  /*Для поднятия*/
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeOverlayButton.removeEventListener('click', hideModal);
  hashtagsField.removeEventListener('input', disableSendButton);
  pristine.reset();
  deleteRescaleListeners();
  resetScale();
  resetEffects();
  uploadForm.reset();
}

const isValidTagsCount = (tags) => tags.length <= MAX_TAGS_COUNT;

const hasUniqueTags = (tags) => tags.length === new Set(tags).size;

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const validateTags = (value) => {
  const fixedTags = value
    .toLowerCase()
    .replace(/ +/g, ' ').trim()
    .split(' ');
  return isValidTagsCount(fixedTags) && hasUniqueTags(fixedTags) && fixedTags.every(isValidTag);
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  ERROR_TAGS_MESSAGE
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(showSuccessMessage, showErrorMessage, formData);
  }
});


uploadButton.addEventListener('change', openModal);

export { hideModal, onDocumentKeydown };
