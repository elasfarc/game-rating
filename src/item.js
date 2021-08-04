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
  const itemDetails = document.createElement('div');
  itemDetails.classList.add('item-details', 'flex', 'space-around');

  // external api
  const entrypoint = `civilization/${itemID}`;
  const result = await get({ API: 'AOE', entrypoint });
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

  return itemDetails;
};

const AddItemcomments = async (itemID = 1) => {
  const itemComments = document.createElement('div');
  itemComments.classList.add('item-comments');

  // external api
  const entrypoint = `comments?item_id=${itemID}`;
  const comments = await get({ API: 'involvement', entrypoint });

  comments.forEach((comment) => {
    itemComments.innerHTML = `
        <div class="comment flex">
            <div class='avatar flex center y-axis-center'>
                <i class="fas fa-user-circle"></i>
            </div>
            <div class=data flex flex-col center>
                <p class="name">${comment.username}</p> 
                <p class="date">${comment.creation_date}</p> 
                <p class="contnet">${comment.comment}</p>
            </div>
        </div>
        `;
  });

  return itemComments;
};

export const displayPopup = async (itemID) => {
  // the whole item container
  AddContainerStructureAndStyles();
  // item info

  const contentContainer = document.querySelector('.content-container');
  // const itemDetails = await AddItemDetails(itemID);

  // contentContainer.appendChild(itemDetails);

  // item comments

  // const itemComments = await AddItemcomments(itemID);
  // contentContainer.appendChild(itemComments);
  // AddItemcomments(itemID);
  // item add comment

  contentContainer.innerHTML = `
    <div class="item-details flex space-around">     
            <div class="data">
                <p>name: Aztecs</p> 
                <p>id: 1</p>
                <p>army type: Infantry and Monk</p>
                <p>expansion: The Conquerors</p>
                <p>team_bonus: Relics generate +33% gold</p>
                <ul class="list" list-label="civilization bonus:"><li>Villagers carry +5</li><li>Military units created 15% faster</li><li>+5 Monk hit points for each Monastery technology</li><li>Loom free</li></ul>
            </div>

            <div class="img">
                <img src="http://localhost:8080/d98175a1444bb869da95.png" alt="">
            </div> 
        </div><div class="item-comments">
        <div class="comment flex">
            <div class="avatar flex center y-axis-center">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="data" flex="" flex-col="" center="">
                <p class="name">MR.JO</p> 
                <p class="date">2021-08-04</p> 
                <p class="contnet">best-game-ever</p>
            </div>
        </div>
        </div>

        <div class="new-comment-container">
            <div class="title">
                <h1>Add a comment</h1>
            </div>
            <form class='flex flex-col y-axis-center'>
                <input name='name' type="text" placeholder='Enter your name' required>
                <textarea name="comment-area" cols="30" rows="10" placeholder='Your insights' required></textarea>
                <button class='btn comment-btn' type="submit">
                    <i class="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
  `;
};
