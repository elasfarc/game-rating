import { elementChildrenCounter } from '../services/helpers/helpers.js';
import Counter from '../services/model/counter.js';

describe('#elementChildrenCounter', () => {
  const commentContainer = document.createElement('div');

  it('returns a Counter object', () => {
    const counter = elementChildrenCounter({ element: commentContainer });
    expect(typeof counter).toBe('object');
    expect(counter instanceof Counter).toBe(true);
  });

  it('the property `value` of the returned obj represent the number of children elements ', () => {
    commentContainer.innerHTML = `
        <div>comment1</div>
        <div>comment2</div>
        <div>comment3</div>

    `;
    const commentsCounter = elementChildrenCounter({ element: commentContainer });

    expect(commentsCounter.value).toBe(3);
  });

  test('when a new comment is added, the returned obj\'s value reflects the increase ', () => {
    commentContainer.innerHTML
    += `
        <div>comment4</div>
    `;
    const commentsCounter = elementChildrenCounter({ element: commentContainer });

    expect(commentsCounter.value).toBe(4);
  });
});