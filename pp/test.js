class A{
    #a = 1
    constructor (a) {
        this.#a = a;
    }
    get a (){return this.#a}
    set a (a){this.#a = a+1}
}

b = new A();

console.log(b.a);
b.a = 2;
console.log(b.a);