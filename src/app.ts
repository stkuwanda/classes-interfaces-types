// an interface defines the structure of an object but is non-instatiable.
// use it as a type
// a type alias can be used to achieve something similar, like using it as
// a type.
type Person = {
  name: string;
  age: number;

  greet(greeting: string): void;
}

const user: Person = {
  name: 'Simba',
  age: 34,
  greet(greeting) {
    console.log(`${greeting} ${this.name}.`);
  },
}

user.greet('Hi, my name is')