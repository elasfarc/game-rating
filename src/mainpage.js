import { get } from './services/api/utilities/provider.js';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/img/', false, /\.(png|jpe?g|svg)$/));

const fillPage = async () => {
  document.getElementById('grid').innerHTML = '';
  const entrypoint = 'civilizations';
  let result;
  if (!localStorage.getItem('database')) {
    result = await get({ API: 'AOE', entrypoint });
    window.localStorage.setItem('database', JSON.stringify(result));
  } else {
    result = JSON.parse(window.localStorage.getItem('database'));
  }
  const sorted = [...result.civilizations.sort((a, b) => a.name.localeCompare(b.name))];
  sorted.splice(9, 1);
  sorted.splice(15, 1);
  for (let i = 0; i < sorted.length; i += 1) {
    const base = document.getElementById('grid');
    const elemContainer = document.createElement('div');
    elemContainer.classList.add('col-xl-2', 'list-element', 'card', 'col-12', 'my-xl-2', 'my-3', 'mx-xl-3');
    elemContainer.id = `Card-${i}`;
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = sorted[i].name;
    img.classList.add('civ-img-style', 'card-img-top', 'mx-auto');
    elemContainer.appendChild(img);
    const body = document.createElement('div');
    body.classList.add('civ-body-style', 'card-body');
    const text = document.createElement('h3');
    text.classList.add('civ-text-style', 'card-title', 'h3');
    text.innerText = `${sorted[i].name}`;
    const likeButton = document.createElement('a');
    likeButton.classList.add('civ-button', 'btn', 'mx-2');
    likeButton.id = `Likebutton-${i}`;
    likeButton.innerText = 'Like';
    likeButton.style = 'width: 40%';
    const commentButton = document.createElement('a');
    commentButton.classList.add('civ-button', 'btn', 'mx-2');
    commentButton.id = `Commentbutton-${i}`;
    commentButton.innerText = 'Comment';
    commentButton.style = 'width: 40%';
    body.appendChild(text);
    body.appendChild(likeButton);
    body.appendChild(commentButton);
    elemContainer.appendChild(body);
    base.appendChild(elemContainer);
  }
};
export default fillPage;