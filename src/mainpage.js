import { get } from './services/api/utilities/provider.js';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/img/', false, /\.(png|jpe?g|svg)$/));

const createElement = (name = 'temp') => {
  const base = document.getElementById('grid');
  const elemContainer = document.createElement('div');
  elemContainer.classList.add('col-3', 'list-element', 'mx-2');
  const img = document.createElement('img');
  img.src = `./assets/img/${name.toLowerCase()}.png`;
  img.alt = '';
  img.classList.add('civ-img-style', 'mx-auto');
  elemContainer.appendChild(img);
  base.appendChild(elemContainer);
};
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
    const { name } = sorted[i];
    console.log(`${name} and ${i}`);
    const base = document.getElementById('grid');
    const elemContainer = document.createElement('div');
    elemContainer.classList.add('col-3', 'list-element', 'mx-2');
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = '';
    img.classList.add('civ-img-style', 'mx-auto');
    elemContainer.appendChild(img);
    if (i % 3 === 0) {
      const line = document.createElement('div');
      line.classList.add('w-100');
      base.appendChild(line);
    }
    base.appendChild(elemContainer);
  }
};

export default fillPage;