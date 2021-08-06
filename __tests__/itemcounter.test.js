/**
 * @jest-environment jsdom
 */
import itemCounter from '../src/itemcounter.js';

describe('check for correct item count display', () => {
  document.body.innerHTML = '<div id="MainContent"><div id="grid" class="row justify-content-between mb-4"><div></div><div></div><div></div><div></div></div></div>';
  const grid = document.getElementById('grid');
  const base = document.getElementById('grid').childElementCount;
  beforeEach(() => {
    itemCounter(document.getElementById('grid').childElementCount);
  });
  afterEach(() => {
    document.getElementById('MainContent').removeChild(document.getElementById('MainContent').firstChild);
    grid.innerHTML += '<div></div>';
  });
  it('checks for base value', () => {
    expect(document.getElementById('MainContent').firstChild.innerText).toBe(`Item Count: ${base}`);
  });
  it('checks for incremented value', () => {
    expect(document.getElementById('MainContent').firstChild.innerText).toBe(`Item Count: ${base + 1}`);
  });
  it('checks for second increment', () => {
    expect(document.getElementById('MainContent').firstChild.innerText).toBe(`Item Count: ${base + 2}`);
  });
});