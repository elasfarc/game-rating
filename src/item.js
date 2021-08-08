/* eslint-disable import/prefer-default-export */

import pic from './assets/imgs/1.png';
import { get, post } from './services/api/utilities/provider.js';
import { elementChildrenCounter } from './services/helpers/helpers.js';

const generateFlashMsg = ({ type, msg = undefined }) => {
  const status = type ? 'success' : 'danger';
  const flashMsg = document.createElement('div');
  flashMsg.classList.add('flash-msg', status);
  const content = (status === 'success') ? (msg || 'successfully created 😊') : (msg || 'FAILED 😱');
  flashMsg.innerText = content;
  return flashMsg;
};

const AddContainerStructureAndStyles = () => {
  const body = document.querySelector('body');

  const bodyElements = document.querySelectorAll('body > div:not(.item-container), nav, footer');
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');
  itemContainer.innerHTML = `
      <div class='close'><i class="fas fa-times"></i></div>
      <div class='content-container flex flex-col y-axis-center'></div>
    `;

  const closeBtn = itemContainer.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    itemContainer.classList.add('hide');

    bodyElements.forEach((ele) => ele.classList.remove('blur-bg'));
    setTimeout(() => { body.removeChild(itemContainer); }, 600);
  });

  bodyElements.forEach((ele) => ele.classList.add('blur-bg'));
  body.appendChild(itemContainer);
};

const AddItemDetails = async (itemID = 1) => {
  const itemDetails = document.createElement('div');
  itemDetails.classList.add('item-details', 'flex', 'space-around');

  const entrypoint = `civilization/${itemID}`;
  const result = await get({ API: 'AOE', entrypoint });

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
const createCommentComponnent = ({ username, creationDate, comment }) => `
    <div class="comment flex">
        <div class='avatar flex center y-axis-center'>
            <i class="fas fa-user-circle"></i>
        </div>
        <div class=data flex flex-col center>
            <p class="name">${username}</p> 
            <p class="date">${creationDate}</p> 
            <p class="contnet">${comment}</p>
        </div>
    </div>
    `;
const DisplayAllItemComments = async (itemID = 1) => {
  const itemComments = document.createElement('div');
  itemComments.classList.add('item-comments');

  const entrypoint = `comments?item_id=${itemID}`;
  let comments = await get({ API: 'involvement', entrypoint });
  // eslint-disable-next-line no-unused-expressions
  comments?.error?.[comments = []];
  comments.forEach((comment) => {
    const data = {
      username: comment.username,
      creationDate: comment.creation_date,
      comment: comment.comment,
    };
    itemComments.innerHTML += createCommentComponnent(data);
  });

  const commentsCounter = elementChildrenCounter({ element: itemComments });
  itemComments.insertAdjacentHTML('afterbegin', `
  <div class='comments-box-heading flex center y-axis-center'>
      Comments ( <span id='comments-counter'>${commentsCounter.value}</span> )
  </div>
`);

  return itemComments;
};
// eslint-disable-next-line camelcase
const postComment = async ({ item_id, username, comment }) => {
  const entrypoint = 'comments';
  const data = { item_id, username, comment };
  const { status } = await post({ API: 'involvement', entrypoint, data });
  return status;
};

const handleSubmitionSuccess = ({ name, comment }) => {
  document.querySelector('.item-comments').innerHTML += createCommentComponnent({ username: name.value, comment: comment.value, creationDate: 'now' });

  const counterContainer = document.getElementById('comments-counter');
  const currentCounter = counterContainer.innerText;
  counterContainer.innerText = parseInt(currentCounter, 10) + 1;

  name.value = '';
  comment.value = '';
};

const submitCommentHandler = async (event) => {
  event.preventDefault();

  const { name, comment } = event.target.elements;
  const itemID = event.target.dataset.itemid;

  const data = { item_id: itemID, username: name.value, comment: comment.value };
  const response = await postComment(data);
  const isSuccessful = (response === 201);

  if (isSuccessful) handleSubmitionSuccess({ name, comment });
  const flashMsg = generateFlashMsg({ type: isSuccessful });
  event.target.appendChild(flashMsg);
  setTimeout(() => { event.target.removeChild(flashMsg); }, 2000);
};

const createNewCommentForm = (itemID) => {
  const newCommentContainer = document.createElement('div');
  newCommentContainer.classList.add('new-comment-container');

  newCommentContainer.innerHTML = `
            <div class="title">
                <h1>Add a comment</h1>
            </div>
            <form data-itemID='${itemID}' name='newComment' class='flex flex-col y-axis-center'>
                <input name='name' type="text" placeholder='Enter your name' required>
                <textarea name="comment" cols="30" rows="5" placeholder='Your insights' required></textarea>
                <button class='btn comment-btn' type="submit">
                    <i class="far fa-paper-plane"></i>
                 </button>
            </form>

        `;

  return newCommentContainer;
};

export const displayPopup = async (itemID) => {
  AddContainerStructureAndStyles();
  const contentContainer = document.querySelector('.content-container');

  const itemDetails = await AddItemDetails(itemID);
  contentContainer.appendChild(itemDetails);

  const newCommentContainer = createNewCommentForm(itemID);
  contentContainer.appendChild(newCommentContainer);

  const newCommentForm = document.forms.newComment;
  newCommentForm.addEventListener('submit', submitCommentHandler);

  const itemComments = await DisplayAllItemComments(itemID);
  contentContainer.appendChild(itemComments);
};