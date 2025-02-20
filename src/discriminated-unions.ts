type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: 'Max',
	privileges: ['create-server'],
	startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
	// type guard using primitive types
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log('Name: ' + emp.name);

	// type guards using `in` operation which checks for property availability in an object
	if ('privileges' in emp) {
		console.log('Privileges: ' + emp.privileges);
	}

	if ('startDate' in emp) {
		console.log('Start Date: ' + emp.startDate);
	}
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
	drive() {
		console.log('Driving...');
	}
}

class Truck {
	drive() {
		console.log('Driving a truck...');
	}

	loadCargo(amount: number) {
		console.log('Loading cargo ...' + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();

	// type guard using the `instanceof` operator
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);

// Discriminated unions

interface Bird {
	type: 'bird'; // this makes a clear distinction/discrimination
	flyingSpeed: number;
}

interface Horse {
	type: 'horse';
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveCreature(animal: Animal) {
	let speed;

  // guards set on discriminated unions are clearer
	if (animal.type === 'bird') {
		speed = animal.flyingSpeed;
	}

	if (animal.type === 'horse') {
    speed = animal.runningSpeed;
	}

  console.log(`Creature is moving at speed ${speed}.`);
}

const eagle: Animal = { type: 'bird', flyingSpeed: 150 };
moveCreature(eagle);
