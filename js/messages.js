import { hideModal, onDocumentKeydown } from './form.js';

const ALERT_SHOW_TIME = 5000;

const bodyElement = document.body;

const successMessageTemplate = document.querySelector('#success').content;
const newSuccessMessage = successMessageTemplate.cloneNode(true);
const successButton = newSuccessMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content;
const newErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = newErrorMessage.querySelector('.error__button');

const createMessages = () => {
  bodyElement.append(newSuccessMessage);
  document.querySelector('.success').classList.add('hidden');
  bodyElement.append(newErrorMessage);
  document.querySelector('.error').classList.add('hidden');
};

const closeSuccessMessage = () => {
  document.querySelector('.success').classList.add('hidden');
  successButton.removeEventListener('click', closeSuccessMessage);
  hideModal();
};

const showSuccessMessage = () => {
  document.querySelector('.success').classList.remove('hidden');
  successButton.addEventListener('click', closeSuccessMessage);
};

const onDocumentErrorKeydown = (evt) => {
  if(evt.key === 'Escape'){
    closeErrorMessage();
  }
};

const onDocumentClick = (evt) => {
  if(evt.target.classList.contains('error')){
    closeErrorMessage();
  }
};

function closeErrorMessage () {
  /* Для поднятия */
  document.querySelector('.error').classList.add('hidden');
  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentErrorKeydown);
  document.removeEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showErrorMessage = () => {
  document.querySelector('.error').classList.remove('hidden');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onDocumentErrorKeydown);
  document.addEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

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

export {createMessages, showSuccessMessage, showErrorMessage, showAlert};
