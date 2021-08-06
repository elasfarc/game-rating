class Counter {
    #value

    constructor(){
        this.#value = 0;
    }

    get value(){
        return this.#value;
    }

    increase(){
        this.#value++;
        return this;
    }

    decrease(){
        this.#value--;
        return this;
    }

    reset(){
        this.#value = 0;
    }

}