import { showAlert } from './messages.js';

const baseUrl = 'https://28.javascript.pages.academy/kekstagram';
const dataUrl = '/data';

const getData = (onSuccess) => {
  fetch(`${baseUrl}${dataUrl}`)
    .then((response) =>{
      if(!response.ok){
        showAlert('Произошла ошибка при запросе к серверу...');
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => showAlert('Произошла ошибка при запросе к серверу...'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(`${baseUrl}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
