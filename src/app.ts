// type intersection

type Combinable = string | number | symbol;
type Selectable = boolean | number | symbol;

// type intersection with aliased union types.
// the & operator will return the common type or
// a union of types if there's more than one common type
// into the alias.
type Universal = Combinable & Selectable; // Universal aliases the returned union type (number | symbol)

const item: Universal = 6;
const item2: Universal = Symbol('test');
console.log(item, item2);

// type intersection with aliased custom object types
// the & operator will return a combined custom object type
// into the declared alias
type Admin = { privileges: string[] };
type Employee = { name: string; startDate: Date };
type ElevatedEmployee = Admin & Employee;

const specialUser: ElevatedEmployee = {
	name: 'Simba',
	startDate: new Date(),
	privileges: ['super-user'],
};

console.log(specialUser);


// type intersection with interfaces.
// the & operator will return a combined custom object type
// into the declared alias, same as type intersection with
// aliased custom object times.
interface Authenticated {
	privileges: string[];
}

interface Personnel {
	name: string;
	startDate: Date;
}

type Forewoman = Authenticated & Personnel;
const manager: Forewoman = {
	name: 'Chichie',
	startDate: new Date(),
	privileges: [''],
};

console.log(manager);
