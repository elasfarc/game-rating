const itemCounter = (num) => {
  const counter = document.createElement('p');
  counter.classList.add('item-counter-style');
  counter.innerText = `Item Count: ${num}`;
  counter.style = 'color:white';
  document.getElementById('MainContent').insertBefore(counter, document.getElementById('grid'));
};

export default itemCounter;