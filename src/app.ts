// an interface defines the structure of an object but is non-instatiable.
// use it as a type
// a type alias can be used to achieve something similar, like using it as
// a type.
interface Greetable {
	greet(greeting: string): void; // members are implicitly public
}

// type Greetable = {
// 	greet(greeting: string): void;
// };

interface Identifiable {
	name: string;
	age: number;
}

// interfaces can `extend` one or more other interfaces
interface Shakable extends Identifiable {
	shakeHands(): void;
}

// implementing multiple interfaces
class Person implements Greetable, Shakable {
	readonly name: string;

	constructor(n: string, public age: number) {
		this.name = n;
	}

	greet(greeting: string): void {
		console.log(`${greeting} ${this.name}.`);
	}

	shakeHands(): void {
		console.log(`${this.name} is shaking hands with someone.`);
	}
}

const user = new Person('Simba', 34);
user.greet('Hi, my name is');
user.shakeHands();

// explicit type casting
let shakableUser: Shakable = user as Shakable; // casting use `as` keyword
shakableUser.shakeHands();

let greetableUser: Greetable = <Greetable>user; // casting using angle brackets
greetableUser.greet('This greeting comes from a Software Engineer named');

const user2 = new Person('Chichie', 28);

// implicit type casting
shakableUser = user2; // casting use `as` keyword
shakableUser.shakeHands();

greetableUser = user2; // casting using angle brackets
greetableUser.greet('This greeting comes from a Software Engineer named');

// function types with type aliases and interfaces

// simple function type declaration
const addNum: (a: number, b: number) => number = (a: number, b: number) => a + b;

// type alias declaration
type AddNumFunc = (a: number, b: number) => number;

const addNumbers: AddNumFunc = function (a: number, b: number) {
	return a + b;
};

// interface declaration
interface AddNumberFunc {
	(a: number, b: number): number;
}

const addNums: AddNumberFunc = (a: number, b: number) => a + b;
