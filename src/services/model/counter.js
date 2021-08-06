export default class Counter {
    #value

    constructor({ startPoint = 0 }) {
      this.#value = startPoint;
    }

    get value() {
      return this.#value;
    }

    increase() {
      this.#value++;
      return this;
    }

    decrease() {
      this.#value--;
      return this;
    }

    reset() {
      this.#value = 0;
    }
}