import './assets/styles/main.css';
import './assets/styles/item/container.css';
import './assets/styles/item/details.css';
import { displayPopup } from './item.js';

const btn = document.querySelector('#btn');
// btn.addEventListener('click', async () => {
//   const result = await get({ entrypoint: 'civilization/1' });
//   console.log(result);
// });

btn.addEventListener('click', displayPopup);