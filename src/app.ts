class Department {
	name: string;

	constructor(n: string) {
		this.name = n;
	}

	describe(this: Department, code: string) { // type checking for any object that calls this function definition
		console.log(`Department: ${this.name} : ${code}`);
	}
}

const accounting = new Department('accounting');
const accountingCopy = { name: 'accounting', describe: accounting.describe };
accounting.describe('ABX1'); // prints => Department: accounting
accountingCopy.describe('ABX2'); // prints => Department: undefined
