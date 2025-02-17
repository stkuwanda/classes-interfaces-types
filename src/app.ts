// an interface defines the structure of an object but is non-instatiable.
// use it as a type
// a type alias can be used to achieve something similar, like using it as
// a type.
interface Greetable {
  greet(greeting: string): void;
}

interface Shakable {
  shakeHands(): void;
}

// implementing multiple interfaces
class Person implements Greetable, Shakable{
  constructor(public name:string, public age: number) {}

  greet(greeting: string): void {
    console.log(`${greeting} ${this.name}.`);
  }

  shakeHands(): void {
    console.log(`${this.name} is shaking hands with someone.`)
  }
  
}

const user = new Person('Simba', 34);
user.greet('Hi, my name is');
user.shakeHands();

// explicit type casting 
let shakableUser: Shakable = user as Shakable; // casting use `as` keyword
shakableUser.shakeHands();

let greetableUser: Greetable =  <Greetable> user; // casting using angle brackets
greetableUser.greet('This greeting comes from a Software Engineer named');

const user2 = new Person('Chichie', 28);

// implicit type casting
shakableUser = user2; // casting use `as` keyword
shakableUser.shakeHands();

greetableUser = user2; // casting using angle brackets
greetableUser.greet('This greeting comes from a Software Engineer named');

