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
    elemContainer.classList.add('col-2', 'list-element', 'card');
    elemContainer.style = 'width: 12vw';
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = sorted[i].name;
    img.classList.add('civ-img-style', 'card-img-top', 'mx-auto');
    elemContainer.appendChild(img);
    const body = document.createElement('div');
    body.classList.add('civ-body-style', 'card-body');
    const text = document.createElement('h5');
    text.classList.add('civ-text-style', 'card-title');
    const likeButton = document.createElement('a');
    likeButton.classList.add('civ-like-button', 'btn', 'btn-primary');
    likeButton.innerText = 'Like';
    body.appendChild(text);
    body.appendChild(likeButton);
    elemContainer.appendChild(body);
    if (i % 6 === 0) {
      const line = document.createElement('div');
      line.classList.add('w-100', 'my-3');
      base.appendChild(line);
    }
    base.appendChild(elemContainer);
  }
};
export default fillPage;