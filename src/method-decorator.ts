// decorator factory for a method decorator
function withBudget(actionBudget: number) {
	return function <T extends { budget: number }>(
		target: Function,
		context: ClassMethodDecoratorContext<T>
	) {
		console.log('target:', target);
		
		return function (this: T, ...args: any[]) {
			const instance = this;
			console.log(instance);
			if (instance.budget > actionBudget) {
				instance.budget = instance.budget - actionBudget;
				target.apply(instance, args);
			} else {
				console.error(
					`Insufficient budget for ${context.name.toString()}. Required ${actionBudget}, available ${
						instance.budget
					}`
				);
			}
			return target;
		};
	};
}

class Project {
	budget: number = 900;

	@withBudget(10)
	writeTests() {
		console.log('Tests are important!!!');
	}

	@withBudget(500)
	fixBugInProduction() {
		console.log('Fixing bug in production .... :(((');
	}
}

const project = new Project();
project.fixBugInProduction();
project.fixBugInProduction();

// function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   descriptor.value = function(...args: any[]) {
//     return originalMethod.apply(this, args);
//   };
//   return descriptor;
// }

function AutoBind<T extends { message: string }>(
	target: Function,
	context: ClassMethodDecoratorContext<T>
) {
	console.log(target);

	return function (this: T, ...args: any[]) {
		const instance = this;

		if (instance instanceof MyComponent) {
			console.log(instance);
			target.apply(instance, args);
			return target;
		} else  {
			console.error('Attempting to bind to wrong `this`.');
			console.dir(this);
		}
	};
}

class MyComponent {
	message: string;

	constructor(message: string) {
		this.message = message;
	}

	@AutoBind
	handleClick(event: Event) {
		console.log('Button clicked!', this.message); // 'this' will be correctly bound
		console.log('Event:', event);
	}

	// Without the decorator, this would lose 'this' context
	handleClickWithoutAutoBind(event: Event) {
		console.log('Button clicked (without autobind)!', this.message); // 'this' will be undefined or the global object
		console.log('Event:', event);
	}

	render() {
		const button = document.createElement('button');
		button.textContent = 'Click me!';
		button.addEventListener('click', this.handleClick); // Correctly bound because of @AutoBind

		// const buttonWithoutAutoBind = document.createElement('button');
		// buttonWithoutAutoBind.textContent = 'Click me (No AutoBind)!';
		// buttonWithoutAutoBind.addEventListener(
		// 	'click',
		// 	this.handleClickWithoutAutoBind
		// ); // this will be undefined

		document.body.append(button);
		// document.body.append(buttonWithoutAutoBind);
	}
}

const component = new MyComponent('Hello from MyComponent!');
component.handleClick(new Event('Called'));
const button = document.querySelector('button')!;
button.addEventListener('click', component.handleClick);
// component.render();

// // Demonstrating the issue without autobind more explicitly:

// const unboundClickHandler = component.handleClickWithoutAutoBind; // Extract the function
// unboundClickHandler(new Event('click')); // 'this' is lost; likely undefined in strict mode or the global object in non-strict mode.

// // To fix this *without* the decorator, you would have to do this:
// const boundClickHandler = component.handleClickWithoutAutoBind.bind(component);
// boundClickHandler(new Event('click')); // Now 'this' refers to component