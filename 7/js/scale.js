const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;
const scaleControlPanel = document.querySelector('.img-upload__scale');
const biggerButtonElement = scaleControlPanel.querySelector('.scale__control--bigger');
const smallerButtonElement = scaleControlPanel.querySelector('.scale__control--smaller');
const scalePanelValue = scaleControlPanel.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
let currentScaleValue = parseInt(scalePanelValue.value, 10);

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

const addRescaleListeners = () => {
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
};

const deleteRescaleListeners = () => {
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
};

const resetScale = () => {
  currentScaleValue = DEFAULT_SCALE_VALUE;
  scaleImage(currentScaleValue);
};

export{addRescaleListeners, deleteRescaleListeners, resetScale};
