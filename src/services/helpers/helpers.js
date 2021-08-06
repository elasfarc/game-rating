/* eslint-disable import/prefer-default-export */

import Counter from '../model/counter.js';

export const nodeChildrenCounter = ({ nodeTree }) => new Counter({ startPoint: nodeTree.childElementCount });