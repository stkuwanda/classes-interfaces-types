// how to cast a `number` type into a string.
// this is not conventional.
let item = <unknown>1; // cast the number to type `unknown`
const item2 = <string> item; //  cast the unknown type into a string
const num = 323;

// double casting done in a single line
const item3 = <string><unknown>num;