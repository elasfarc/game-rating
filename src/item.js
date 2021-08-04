/* eslint-disable import/prefer-default-export */

import { get } from './services/api/utilities/provider.js';
import pic from './assets/imgs/1.png';

const AddContainerStructureAndStyles = () => {
  const body = document.querySelector('body');
  const appContainer = document.querySelector('.container');
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');
  itemContainer.innerHTML = `
      <div class='close'><i class="fas fa-times"></i></div>
      <div class='content-container flex flex-col'></div>
    `;

  const closeBtn = itemContainer.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    itemContainer.classList.add('hide');
    appContainer.classList.remove('blur-bg');
    setTimeout(() => { body.removeChild(itemContainer); }, 600);
  });

  appContainer.classList.add('blur-bg');
  body.appendChild(itemContainer);
};

const AddItemDetails = async (itemID = 1) => {
  const contentContainer = document.querySelector('.content-container');
  const itemDetails = document.createElement('div');
  itemDetails.classList.add('item-details', 'flex', 'space-around');

  // external api
  const entrypoint = `civilization/${itemID}`;
  const result = await get({ API: 'AOE', entrypoint });
  console.log(entrypoint, result);

  //
  itemDetails.innerHTML = `     
            <div class='data'>
                <p>name: ${result.name}</p> 
                <p>id: ${result.id}</p>
                <p>army type: ${result.army_type}</p>
                <p>expansion: ${result.expansion}</p>
                <p>team_bonus: ${result.team_bonus}</p>
                <ul class='list' list-label="civilization bonus:"></ul>
            </div>

            <div class='img'>
                <img src='${pic}' alt="">
            </div> 
        `;
  const bounsList = itemDetails.querySelector('ul');
  result.civilization_bonus
    .forEach((ele) => {
      bounsList.innerHTML += `<li>${ele}</li>`;
    });

  contentContainer.appendChild(itemDetails);
  // return itemDetails;
};

export const displayPopup = (itemID) => {
  // the whole item container
  AddContainerStructureAndStyles();
  // item info
  AddItemDetails(itemID);
  // item comments

  // item add comment
};
