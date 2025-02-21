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