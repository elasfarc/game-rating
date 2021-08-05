import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import './assets/styles/item/container.css';
import './assets/styles/item/details.css';
import './assets/styles/item/comments.css';
import { displayPopup } from './item.js';
import fillPage from './mainpage.js';
import pic from './assets/imgs/2.png';

const btn = document.querySelector('#btn');
// btn.addEventListener('click', async () => {
//   const result = await get({ entrypoint: 'civilization/1' });
//   console.log(result);
// });
btn.addEventListener('click', async () => {
  await fillPage();
});