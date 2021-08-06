/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */

import Counter from '../model/counter.js';

export const nodeChildrenCounter = ({ node }) => new Counter({ startPoint: node.childElementCount });