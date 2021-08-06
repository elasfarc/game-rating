export default class Counter {
    #value

    constructor({ startPoint = 0 }) {
      this.#value = startPoint;
    }

    get value() {
      return this.#value;
    }

    increase() {
      this.#value += 1;
      return this;
    }

    decrease() {
      this.#value -= 1;
      return this;
    }

    reset() {
      this.#value = 0;
    }
}