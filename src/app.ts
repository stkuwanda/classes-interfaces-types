class Department {
	name: string;

	constructor(n: string) {
		this.name = n;
	}

	describe() {
		console.log(`Department: ${this.name}`);
	}
}

const accounting = new Department('accounting');
const accountingCopy = { describe: accounting.describe };
console.log(accounting.describe()); // prints => Department: accounting
console.log(accountingCopy.describe()); // prints => undefined
