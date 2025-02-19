// decorator from a decorator factory
// note: the returned after calling the function is the actual
// decorator function.
// function Logger(message: string) {
// 	console.log('logger factory...');

// 	return function (value: Function) {
// 		console.log(message);
// 		console.log(value);
// 	};
// }

// utility method to return a string in-between a pair of braces
// function getStringBetweenBraces(str: string) {
// 	const match = str.match(/\{(.*?)\}/); // The regex explained below
// 	if (match) {
// 		return match[1]; // The captured group (content inside parentheses)
// 	} else {
// 		return null; // Or handle the case where no match is found
// 	}
// }

// complex decorator factory used to update the DOM
// function WithTemplate(html: string, elementId: string) {
// 	console.log('template factory...');

// 	return function (value: any) {
// 		console.log('render template...');
// 		const p = new value();
// 		const template = getStringBetweenBraces(html)!;

// 		if (template) {
// 			html = html.replace(`{${template}}`, p[template]);
// 		}

// 		const div = document.getElementById(elementId);
// 		if (div) div.innerHTML = html;
// 	};
// }

// @Logger('LOGGING - PERSON')
// @WithTemplate('<div>{name}</div>', 'app')
// class Person {
// 	name = 'Simba';

// 	constructor() {
// 		console.log('creating a Person object...');
// 	}
// }

// const guy = new Person();
// console.log(guy);

// Decorators on properties
// function Log(arg: any, target: any) {
// 	console.log('Log decorator...');
// 	console.log('arg:', arg);
// 	console.log('target:', target);
// }

// class Product {
// 	@Log
// 	title: string;

// 	set price(val: number) {
// 		if (val > 0) {
// 			this._price = val;
// 		} else {
// 			throw Error('Invalid input!');
// 		}
// 	}

// 	get price() {
// 		return this._price;
// 	}

// 	constructor(public t: string, private _price: number) {
// 		this.title = t;
// 	}

// 	getTaxedPrice(tax: number) {
// 		return this._price * (1 + tax);
// 	}
// }

function PrintDecoratorDataOnClass(value: Function, context: ClassDecoratorContext) {
	console.log('PrintDecoratorDataOnClass...');
	console.log('value:', value);
	console.log('context:', context);
	context.addInitializer(() => {
		console.log(`Initialized class ${context.name}`);
	});
}

function PrintDecoratorDataOnField(value: Function | undefined, context: DecoratorContext) {
	console.log('PrintDecoratorDataOnField...');
	console.log('value:', value);
	console.log('context:', context);
	context.addInitializer(() => {
		console.log(`${context.name?.toString()}`);
	});
}

@PrintDecoratorDataOnClass
class Manager {
	@PrintDecoratorDataOnField
	task: string = 'Simple task';
	project: string = 'Simple project';

	constructor() {
		console.log('Initializing the Manager class');
	}
}
