let a = "Subodh";
console.log(a.toLowerCase());
// a = 7;
console.log(a.toLowerCase());

function addTwoNums(numA: number, numB: number) {
    return numA + numB;
}

// addTwoNums(2, "3");

const person = {
    firstName: "Subodh",
    age: 100
}

// console.log(person.lastName);

// primitive types
const age: number = 100;// number
const firstName: string = "Subodh"; // string
const isHuman: boolean = true;  // boolean
const fruits: Array<string> = ["Bananas", "Oranges", "Apples"];
const fruits1: string[] = [];


// interfaces and types :- User Defined Type

type Person = {
    firstName: string,
    lastName?: string,
    age: number,
    city: string
}

const peronObj: Person = { firstName: "Subodh", age: 100, city: "" };

interface User {
    firstName: string;
    lastName: string;
    age: number;
}

const userObj: User = { age: 2, firstName: "Subodh", lastName: "Sant" };


class Employee implements User {
    age: number;
    firstName: string;
    lastName: string;

    constructor(age: number, firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

const emp = new Employee(100, "Subodh", "Sant");

class Manager extends Employee {
    role: string;

    constructor(age: number, firstName: string, lastName: string, role: string) {
        super(age, firstName, lastName);
        this.role = role;
    }
}

const mgr = new Manager(100, "foo", "bar", "baz");

// type inference.
let username = "";  // implicit type inference
let anotherUsername: string = "" // explicity type inference
console.log(username.toLowerCase());


// any

let obj: any = { x: 0 };
obj.method();

// generics

type Box<T> = {
    content: T
}

const stringBox: Box<string> = { content: "" };
const numberBox: Box<number> = { content: 8 };
const booleanBox: Box<boolean> = { content: true };
const userBox: Box<User> = { content: { age: 100, firstName: "Subodh", lastName: "Sant" } };

// literal types

type Species = "human" | "bird" | "animal";

let humanSpecies: Species = "human";
let birdSpecies: Species = "bird";
let animalSpecies: Species = "animal";

let obj1 = { a: 1, b: 2, c: 3, d: 4 };
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

getProperty(obj1, "b");
// getProperty(obj1, "e");

export const someUser = { name: "Subodh", country: "India" };

type SomeUserType = typeof someUser;

const anotherSomeUser: SomeUserType = {
    country: "Australia",
    name: "John"
}

