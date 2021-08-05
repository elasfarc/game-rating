import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import './assets/styles/item/container.css';
import './assets/styles/item/details.css';
import './assets/styles/item/comments.css';
import './assets/styles/item/new-comment.css';
import { displayPopup } from './item.js';
import fillPage from './mainpage.js';

const btn = document.querySelector('#btn');
btn.addEventListener('click', async () => {
  await fillPage();
  await displayPopup(1);
});