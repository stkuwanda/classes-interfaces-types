function PrintDecoratorDataOnClass(
	value: Function,
	context: ClassDecoratorContext
) {
	console.log('PrintDecoratorDataOnClass...');
	console.log('value:', value);
	console.log('context:', context);
	context.addInitializer(() => {
		console.log(`Initialized class ${context.name}`);
	});
}

function PrintDecoratorDataOnField(
	value: Function | undefined,
	context: DecoratorContext
) {
	console.log('PrintDecoratorDataOnField...');
	console.log('value:', value);
	console.log('context:', context);
	context.addInitializer(() => {
		console.log(`${context.name?.toString()}`);
	});
}

function WithEmploymentDateOnProtoype(
	value: Function,
	context: ClassDecoratorContext
) {
	value.prototype.employmentDateOnPrototype = new Date().toISOString();
}

function WithEmploymentDateOnObject<T extends new (...args: any[]) => {}>(
	baseClass: T,
	_: ClassDecoratorContext
) {
	return class extends baseClass {
		employmentDate = new Date().toISOString();

		constructor(...args: any[]) {
			super(...args);
			console.log(`Adding employment date to ${baseClass.name}`);
		}
	};
}

@WithEmploymentDateOnObject
@WithEmploymentDateOnProtoype
@PrintDecoratorDataOnClass
class Foreman {
	@PrintDecoratorDataOnField
	task: string = 'Simple task';
	project: string = 'Simple project';

	constructor() {
		console.log('Initializing the Manager class');
	}
}

const foreman = new Foreman() as any;
console.log('foreman instance:', foreman);
console.log('foreman employmentDateOnPrototype:', foreman.employmentDateOnPrototype);

// another class decorator
// factory
function WithTemplate(template: string, hookId: string) {
	// return the actual class decorator
	// note; in a class decorator, the target parameter is a constructor function.
	// this constructor function can be updated/replaced by a custom constructor.
	// this update is done by returning the new function contructor from inside the
	// decorator function.
	// this whole exercise effectively updates or changes the class (constructor function) upon which this
	// class decorator is applied.
	return function <T extends new (...args: any[]) => { name: string }>(
		target: T,
		_: ClassDecoratorContext<T>
	) {
		// code to update class/constructor function
		return class extends target {
      age = 34;

			constructor(...args: any[]) {
				super();
				console.log('Rendering template');
				const hookEl = document.getElementById(hookId);

				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector('h1')!.textContent = this.name;
				}
			}
		};
	};
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Simba';

  constructor() {
    console.log('Creating person object...');
  }
}

// const pers = new Person();