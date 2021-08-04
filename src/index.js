import './assets/styles/main.css';
import './assets/styles/item/container.css';
import './assets/styles/item/details.css';
import { displayPopup } from './item.js';

import pic from './assets/imgs/2.png';

const btn = document.querySelector('#btn');
// btn.addEventListener('click', async () => {
//   const result = await get({ entrypoint: 'civilization/1' });
//   console.log(result);
// });

btn.addEventListener('click', displayPopup);

const container = document.querySelector('.container');

const img = document.createElement('img');

img.width = '300';
img.src = pic;

container.appendChild(img);
