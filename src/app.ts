// type casting
// const input = document.getElementById('user-input');

// if(input) {
//   (input as HTMLInputElement).value = 'Interesting text.';
// }

// const input = document.getElementById('user-input')! as HTMLInputElement;
// input.value = 'Hello World!';

const input = <HTMLInputElement>document.getElementById('user-input')!;
input.value = 'Hello World!';