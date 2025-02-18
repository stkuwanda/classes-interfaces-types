// type casting
// const input = document.getElementById('user-input');

// if(input) {
//   (input as HTMLInputElement).value = 'Interesting text.';
// }

// const input = document.getElementById('user-input')! as HTMLInputElement;
// input.value = 'Hello World!';

const input = <HTMLInputElement>document.getElementById('user-input')!;
input.value = 'Hello World!';

// index properties:
// these define a pattern for how properties are to be set on an object.
// the object on such a type is flexible and can have from zero to any number
// of properties which fit the defined pattern.
// allowed pattern of types: string, number, symbol
interface FlexibleType {
	[key: string]: string; // pattern
}

interface FlexibleContainer {
	[prop: number]: number;
}

const container: FlexibleType = {
	name: 'Simbarashe',
	occupation: 'Software Engineer',
};
const container2: FlexibleContainer = {};
const container3: FlexibleContainer = { 1: 1, 2: 304, 8: 24 };

console.log(container, container2, container3)
