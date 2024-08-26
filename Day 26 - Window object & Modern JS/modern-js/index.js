
// template literal syntax

// from ECMA Script 6 onwards - ES6 or ES2015
// ES2023

const person = { firstName: "Gaurav", lastName: "Sen" };

console.log("My name is " + person.firstName + " " + person.lastName);
console.log("With template literal syntax-", `My name is ${person.firstName} ${person.lastName}`);

const anotherPerson = { firstName: "John", lastName: "Doe" };

let flag = false;

console.log(`My name is ${flag ? anotherPerson.firstName : person.firstName}`)


const firstName = "Jane";
const lastName = "Doe";

const address = "Pune"

// old way
let person2 = { firstName: firstName, lastName: lastName }
console.log(person2);

// shorthand proptery



person2 = { fName: firstName, lastName, address };

console.log("Shorthand property", person2);


//old way

let personName = person2.fName;
console.log(personName);

// Object destrcuturing 

let { fName } = person2;
console.log("With destructuring", fName);


let abc = { a: "value for a", b: "value for b", c: "value for c" };

// alias
let { a: valA, b: aliasForB, c, d } = abc;
// console.log(b);
console.log(c);
console.log(d);

console.log(valA);
console.log(aliasForB);

// desctructure array

let fruits = ["orange", "apple", "kiwi"];
//old way
let firstFruit = fruits[0];
console.log(firstFruit);

let [firstFruitName] = fruits;

console.log(firstFruitName);

let [secondFruit, apple, third] = fruits;
console.log(secondFruit);
console.log(apple);
console.log({ third });

let [, , thirdFruitName] = fruits;
console.log(third);

console.log({ secondFruit, apple, third });

// rest operator ( while destructuring)

//...


console.log(person2);

let { fName: name, ...rest } = person2;

console.log(name);

console.log(rest);

let [first, ...remaining] = fruits
console.log(first, remaining);

// spread operator

// ...

console.log(fruits);
console.log(...fruits);

console.log(person2)
console.log(person);

console.log({ ...person2, ...person })

let someFruits = ["strawberry", "banana"];
console.log([...fruits, ...someFruits]);


// Arrow functions

//old way
const printPerson = function ({ firstName, lastName }) {
    return `My name is ${firstName} ${lastName}`;
}

console.log(printPerson(person));

const printPersonName = ({ firstName, lastName }) => `My name is ${firstName} ${lastName}`;

console.log(printPersonName(person));

const anotherFunction = ({ firstName, lastName }) => {
    console.log(person);
    return `My name is ${firstName} ${lastName}`;

}

console.log(anotherFunction(person));


// optional chaining ?.

let obj = {
    name: "Alice",
    cat: {
        name: "Meow"
    }
}

console.log(obj);

//console.log(obj.dog.name)

if (obj.dog && obj.dog.name) {
    console.log(obj.dog.name);

}
console.log(obj.dog);

// obj.dog = { name: "bark" }

if (obj.dog?.name) {
    console.log(obj.dog.name);

}

// Nullish Coalescing operator - ??

// if the left hand side is null or undefined only then it will return 
// the right hand side 

let a = ""; // 0 , false
let b = "this is b";



let foo = a || b;
console.log(foo);
foo = a ?? b;
console.log(foo);

a = null;
foo = a ?? b;
console.log(foo);

































