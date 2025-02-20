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