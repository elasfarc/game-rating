import { get } from './services/api/utilities/provider.js';

const AddContainerStructureAndStyles = () => {
  const body = document.querySelector('body');
  const appContainer = document.querySelector('.container');
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');
  itemContainer.innerHTML = `
      <div class='close'><i class="fas fa-times"></i></div>
      <h1>the dark side of the moon</h1>
    `;

  appContainer.classList.add('blur-bg');
  body.appendChild(itemContainer);
};

export const displayPopup = () => {
  AddContainerStructureAndStyles();
};
