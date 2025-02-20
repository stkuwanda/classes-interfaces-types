type Task = { name: string; level: 'low' | 'medium' | 'complicated' };

function WithTaskDecorator<T, V extends Task[]>(
	target: undefined,
	context: ClassFieldDecoratorContext<T, V>
) {
	return function (args: V) {
		args.push({ name: 'added task', level: 'complicated' });
		return args;
	};
}

function WithTaskDecoratorFactory(task: Task) {
	return function <T, V extends Task[]>(
		target: undefined,
		context: ClassFieldDecoratorContext<T, V>
	) {
		return function (args: V) {
			args.push(task);
			return args;
		};
	};
}

function WithComplicatedTaskFactory() {
	return WithTaskDecoratorFactory({ name: 'added task', level: 'complicated' });
}

class Manager {
	@WithTaskDecoratorFactory({ name: 'new task', level: 'low' })
	tasks: Task[] = [];

	@WithComplicatedTaskFactory()
	extraTasks: Task[] = [];
}

const manager = new Manager();
console.log('manager instance:', manager);