import { get } from './services/api/utilities/provider.js';
import { getLikes, postLikes } from './likes.js';
import { displayPopup } from './item.js';
import itemCounter from './itemcounter.js';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/img/', false, /\.(png|jpe?g|svg)$/));

const fillPage = async () => {
  let itemCount = 0;
  document.getElementById('grid').innerHTML = '';
  const entrypoint = 'civilizations';
  let result;
  const INVresult = await getLikes();
  if (!localStorage.getItem('database')) {
    result = await get({ API: 'AOE', entrypoint });
    console.log(result);
    window.localStorage.setItem('database', JSON.stringify(result));
  } else {
    result = JSON.parse(window.localStorage.getItem('database'));
  }
  result.civilizations.splice(6, 1);
  result.civilizations.splice(7, 1);
  INVresult.splice(1, 29);
  const temp = INVresult.splice(0, 1);
  INVresult.splice(2, 0, temp[0]);
  for (let i = 0, errorCounter = 0; i < result.civilizations.length; i += 1, errorCounter += 1) {
    if (i === 6 || i === 7) {
      errorCounter += 1;
    }
    const base = document.getElementById('grid');
    const elemContainer = document.createElement('div');
    elemContainer.classList.add('col-xxl-2', 'list-element', 'card', 'col-12', 'col-xl-3', 'col-sm-5', 'col-md-3', 'mx-md-3', 'mb-xl-4', 'my-3', 'mx-xl-2');
    elemContainer.id = `Card-${i}`;
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = result.civilizations[i].name;
    img.classList.add('civ-img-style', 'card-img-top', 'mx-auto');
    elemContainer.appendChild(img);
    const body = document.createElement('div');
    body.classList.add('civ-body-style', 'card-body');
    const text = document.createElement('h3');
    text.classList.add('civ-text-style', 'card-title', 'h3');
    text.innerText = `${result.civilizations[i].name}`;
    const likeButton = document.createElement('a');
    likeButton.classList.add('civ-button', 'btn', 'my-2');
    likeButton.id = `Likebutton-${i + 1}`;
    likeButton.innerText = `Likes : ${INVresult[i].likes}`;
    likeButton.style = 'width: 80%';
    likeButton.addEventListener('click', () => {
      postLikes(i + 1, INVresult[i].likes);
      INVresult[i].likes += 1;
    });
    const commentButton = document.createElement('a');
    commentButton.classList.add('civ-button', 'btn', 'my-2');
    commentButton.id = `Commentbutton-${i}`;
    commentButton.innerText = 'Comments';
    commentButton.style = 'width: 80%';
    commentButton.addEventListener('click', () => {
      displayPopup(errorCounter + 1);
    });
    body.appendChild(text);
    body.appendChild(likeButton);
    body.appendChild(commentButton);
    elemContainer.appendChild(body);
    base.appendChild(elemContainer);
    itemCount += 1;
  }
  itemCounter(itemCount);
};
export default fillPage;