// decorators

// decorator function
function Logger(constructor: Function) {
	console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Simba';

  constructor() {
    console.log('creating a Person object...');
  }
}

const guy = new Person();
console.log(guy);
