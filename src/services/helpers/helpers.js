/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */

import Counter from '../model/counter.js';

export const elementChildrenCounter = ({ element }) => new Counter({ startPoint: element.childElementCount });
