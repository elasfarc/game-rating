import Counter from './services/model/counter.js'

const nodeChildrenCounter = ({nodeTree})=> {
    return new Counter({startPoint: nodeTree.childElementCount});
 }