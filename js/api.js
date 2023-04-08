import { showAlert } from './messages.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const DATA_URL = '/data';

const getData = async () => {
  const response = await fetch(`${BASE_URL}${DATA_URL}`);
  if(!response.ok){
    showAlert(`Произошла ошибке при запросе к серверу: ${response.status}`);
    return;
  }
  const data = await response.json();
  return data;
};

const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}11`, {
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
