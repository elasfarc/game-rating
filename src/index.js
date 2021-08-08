import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import './assets/styles/item/container.css';
import './assets/styles/item/details.css';
import './assets/styles/item/comments.css';
import './assets/styles/item/new-comment.css';
import fillPage from './mainpage.js';

document.addEventListener('DOMContentLoaded', async () => {
  await fillPage();
});