// generics
const names: Array<string> = []; // string[]
// names[0].split(' ');

const promise: Promise<number> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(10);
	}, 2000);
});

promise.then((data) => {
	// data.split(' ');
});

// generic constraints with `extends` key-word
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
	length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = 'Got no value.';
	if (element.length === 1) {
		descriptionText = 'Got 1 element.';
	} else if (element.length > 1) {
		descriptionText = 'Got ' + element.length + ' elements.';
	}

	return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

// combined generic constraints using `keyof` key-word.
// `keyof` refers to property name on the eventual concrete object.
// with `object` type, the `keyof` yields a string, symbol or number instance
// corresponding to the property name or key of the concrete object.
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

// define a class using generics.
// once a contraint is locked in, e.g T is 
// locked to boolean, T will be boolean throughout
// the class.
class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1); // -1
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

// special typescript in-built generics
interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;
	return courseGoal as CourseGoal;
}

const names2: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();
