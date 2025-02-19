// decorator from a decorator factory
// note: the returned after calling the function is the actual
// decorator function.
function Logger(message: string) {
	return function (constructor: Function) {
		console.log(message);
		console.log(constructor);
	};
}

// utility method to return a string in-between a pair of braces
function getStringBetweenBraces(str: string) {
  const match = str.match(/\{(.*?)\}/); // The regex explained below
  if (match) {
    return match[1]; // The captured group (content inside parentheses)
  } else {
    return null; // Or handle the case where no match is found
  }
}

// complex decorator factory used to update the DOM
function WithTemplate(html: string, elementId: string) {
	return function (constructor: any) {
		const p = new constructor();
    const template = getStringBetweenBraces(html)!;

    if(template){
      html = html.replace(`{${template}}`, p[template])
    }

		const div = document.getElementById(elementId);
		if (div) div.innerHTML = html;
	};
}

@WithTemplate('<div>{name}</div>', 'app')
class Person {
	name = 'Simba';

	constructor() {
		console.log('creating a Person object...');
	}
}

const guy = new Person();
console.log(guy);
