import './assets/styles/main.css';
import { get } from './services/api/utilities/provider.js';

const btn = document.querySelector('#btn');
btn.addEventListener('click', async () => {
  const result = await get({ entrypoint: 'civilization/1' });
  console.log(result);
});