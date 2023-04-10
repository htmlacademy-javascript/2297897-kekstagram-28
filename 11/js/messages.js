import { isEscPressed } from './utils.js';
import { hideModal, onDocumentKeydown } from './form.js';

const ALERT_SHOW_TIME = 5000;

const bodyElement = document.body;

const successMessageTemplate = document.querySelector('#success').content;
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const createMessages = () => {
  bodyElement.append(successMessage);
  document.querySelector('.success').classList.add('hidden');
  bodyElement.append(errorMessage);
  document.querySelector('.error').classList.add('hidden');
};

const onDocumentMessageKeydown = (type) => {
  if (isEscPressed){
    closeMessage(type);
    if(type === 'success'){
      hideModal();
    }
  }
};

const onDocumentSuccessKeydown = () => onDocumentMessageKeydown('success');
const onDocumentErrorKeydown = () => onDocumentMessageKeydown('error');

const onButtonClick = (type) => {
  closeMessage(type);
};

const onErrorButtonClick = () => onButtonClick('error');
const onSuccessButtonClick = () => {
  onButtonClick('success');
  hideModal();
};

const onSectionClick = (type) => (evt) => {
  const sectionElement = evt.target.closest(`.${type}`);
  if(!sectionElement){
    return;
  }
  closeMessage(type);
  if(type === 'success'){
    hideModal();
  }
};

const onSuccesSectionClick = onSectionClick('success');
const onErrorSectionClick = onSectionClick('error');

const showMessage = (type) => {
  document.querySelector(`.${type}`).classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  if(type === 'success') {
    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('click', onSuccesSectionClick);
    document.addEventListener('keydown',onDocumentSuccessKeydown);
  } else {
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onErrorSectionClick);
    document.addEventListener('keydown',onDocumentErrorKeydown);
  }
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');

function closeMessage (type) {
  /* Для поднятия */
  document.querySelector(`.${type}`).classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  if(type === 'success') {
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('click', onSuccesSectionClick);
    document.removeEventListener('keydown',onDocumentSuccessKeydown);
  } else {
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('click', onErrorSectionClick);
    document.removeEventListener('keydown',onDocumentErrorKeydown);
  }
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#f6dd12';
  alertContainer.style.color = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

createMessages();

export {createMessages, showSuccessMessage, showErrorMessage , showAlert};
