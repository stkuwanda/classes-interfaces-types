class Department {
	// protected members are visible in all children classes
	protected employees: string[] = [];

	// shorthand declaration of class properties as constructor parameters
	// declaration of a readonly property
	constructor(public readonly id: string, public name: string) {}

	describe(this: Department) {
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

// inheritance with custom constructor
class ITDepartment extends Department {
	constructor(id: string, public admins: string[]) {
		// always call super() to initialize inherited properties.
		// super() call must be first and always precede any use of `this` keyword
		super(id, 'IT'); 
	}

	// override parent implementation
	addEmployee(employee: string): void {
		if(employee === 'Max') {
			return;
		}

		// use `super` to call the parent method to run the default implementation
		super.addEmployee(employee);
	}
}

class AccountingDepartment extends Department {
	private lastReport: string;

	constructor(id:string, private reports: string[]) {
		super(id, 'Accounting');
		this.lastReport = this.reports[this.reports.length - 1] ?? '';
	}

	// getter
	get mostRecentReport() {
		const result = this.lastReport ? this.lastReport :  new Error('No report found!');

		if(typeof result === 'string') {
			return result;
		}

		throw result;
	}

	// setter
	set mostRecentReport(value) {
		const result = value ||  new Error('Invalid input!');

		if(typeof result === 'string') {
			this.addReport(result);
			return;
		}

		throw result;
	}

	addReport(report: string) {
		this.reports.push(report);
		this.lastReport = report;
	}

	printReports() {
		console.log(this.reports);
	}
}

const it = new ITDepartment('ACX1', ['Simba']);
it.addEmployee('Kuku');
it.addEmployee('Christian');
it.addEmployee('Max');
it.addEmployee('Nathan');
it.describe();
it.printEmployeeInfor();
console.log(it);

const acc = new AccountingDepartment('ABX2', ['annually']);
acc.addEmployee('Kuku');
acc.addEmployee('Christian');
console.log(acc.mostRecentReport);
acc.addReport('monthly');
acc.addReport('daily');
acc.mostRecentReport = 'quarterly';
console.log(acc.mostRecentReport);
acc.printReports();
acc.describe();
acc.printEmployeeInfor();
console.log(acc);

const accounting = new Department('ABX1', 'accounting');
accounting.addEmployee('Simba');
accounting.addEmployee('Chichie');
// accounting.employees[3] = 'Christian'; // prevented access to employees property (private property)
accounting.describe();
accounting.printEmployeeInfor();
// const accountingCopy = { name: 'accounting', describe: accounting.describe };
// accounting.describe('ABX1'); // prints => Department: accounting
// accountingCopy.describe('ABX2'); // prints => Department: undefined
