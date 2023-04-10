import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-render.js';
import { renderBigPicture } from './big-picture.js';

const data = await getData();

renderBigPicture(data);
renderThumbnails(data);

export { data };
