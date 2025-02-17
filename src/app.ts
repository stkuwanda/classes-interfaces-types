class Department {
	private employees: string[] = [];

	// shorthand declaration of class properties as constructor parameters
	constructor(public id: string, public name: string) {}

	describe(this: Department,) {
		// type checking for any object that calls this function definition
		console.log(`Department: ${this.name} : ${this.id}`);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInfor() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

const accounting = new Department('ABX1', 'accounting');
accounting.addEmployee('Simba');
accounting.addEmployee('Chichie');
// accounting.employees[3] = 'Christian'; // prevented access to employees property (private property)
accounting.describe();
accounting.printEmployeeInfor();
// const accountingCopy = { name: 'accounting', describe: accounting.describe };
// accounting.describe('ABX1'); // prints => Department: accounting
// accountingCopy.describe('ABX2'); // prints => Department: undefined
