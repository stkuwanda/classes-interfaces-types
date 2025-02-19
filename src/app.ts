// decorator from a decorator factory
// note: the returned after calling the function is the actual
// decorator function.
function Logger(message: string) {
	console.log('logger factory...');
	
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
	console.log('template factory...');

	return function (constructor: any) {
		console.log('render template...');
		const p = new constructor();
    const template = getStringBetweenBraces(html)!;

    if(template){
      html = html.replace(`{${template}}`, p[template])
    }

		const div = document.getElementById(elementId);
		if (div) div.innerHTML = html;
	};
}

@Logger('LOGGING - PERSON')
@WithTemplate('<div>{name}</div>', 'app')
class Person {
	name = 'Simba';

	constructor() {
		console.log('creating a Person object...');
	}
}

const guy = new Person();
console.log(guy);
