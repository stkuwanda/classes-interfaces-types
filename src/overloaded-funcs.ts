type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable): Combinable {
	// type guard using primitive types
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result = add(1, 1);
const result2 = add('cat', ' dog');
const result3 = add(1, ' dog');
