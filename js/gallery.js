import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-render.js';
import { renderBigPicture } from './big-picture.js';

getData(renderThumbnails);
getData(renderBigPicture);
