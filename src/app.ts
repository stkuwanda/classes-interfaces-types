class Department {
	name: string;

	constructor(n: string) {
		this.name = n;
	}

	describe(this: Department) { // type checking for any object that calls this function definition
		console.log(`Department: ${this.name}`);
	}
}

const accounting = new Department('accounting');
const accountingCopy = { name: 'accounting', describe: accounting.describe };
accounting.describe(); // prints => Department: accounting
accountingCopy.describe(); // prints => Department: undefined
