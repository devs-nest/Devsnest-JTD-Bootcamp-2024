// Function Expression
var a = function () {
    console.log('This is function expression');
    return true;
}
// Function declaration
function india(someparam) {
    var someOtherVariable = 10;
    console.log('India is a Tropical region.');
}

// Function Invocation/calling
a();
india();


// When a is going to get invoked or called

// true;    // after
// a(); -- 'This is funcion expression.'
// Global Execution Context



// [[scope]]:-
function a1() {
    function a2() {
        console.log('I am a2 function().');
    }
    console.log('I am a1 function().');
}


function whatIsMyName() {
    return locateMyName();
}

function locateMyName() {
    var locA = "something";
    function getMyName() {
        debugger;
        console.log(locA);
        return 'My name is Subodh.';
    }

    getMyName();
}

// [[scope]] example
/**
 * Example of [[scope]]. 
 * The lexical scope for whatIsMyName2 function is Global Scope/environment.
 * @returns Name of the person.
 */
function whatIsMyName2(){
    let a = 'A value';  
    // Lexical Scope/Environment for LocateMyName function.
    return function locateMyName(){
        let b = 'B value';
        // Lexical Scope/Environment for getMyName function;
        return function getMyName(){
            let c = 'C value';
            return 'Subodh sant';
        }
    }
}


// some codes:-
function getDegreeName() {
    degreeName = 'Bachelor\'s degree.';
    return degreeName;
}

// The above code will leak degreeName variable to global environment.
// Leakage of Global Variables.



// Objects:-

// primitives
var name = 'Subodh Sant';
var phone = 9876543210;
var profession = 'Sofware Professional';
var isEngineer = true;

// related can done using array.
var arr = ['Subodh Sant', '0987654321', 'India', 'Software Professional'];

var person = {
    name: 'Subodh Sant',    // name is property
    phoneNumber: 9876543210,
    address: 'India',
    profession: 'Software Professoinal',
    isEngineer: true,
    "not from space": true
};    // new object using object literal.

// With dot notation you access properties of an object.
console.log(person.name);
// Square bracket notion can also used to access the properties.
console.log(person['profession']);


// Object Constructor
function Person(name, phoneNumber, address, profession, isEngineer) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.profession = profession;
    this.isEngineer = isEngineer;
}


var subodh = new Person('Subodh Sant', 987654321, null, null, null);


// this...

var obj = {
    name: 'Subodh',
    code: function () {
        return this.name + ' is coding...';
    },
    codeInJavaScript() {
        return this.code() + " in JavaScript";
    }
}

obj.code();
//

// resuse of a function.
function getProgrammingAbility() {
    console.log(this);
    return this.name + " is a good programmer.";
}

var name = "ShivaParvati";

var obj1 = {
    name: "Haritha",
    getProgrammingAbility: getProgrammingAbility
}

var obj2 = {
    name: 'Chandu',
    getProgrammingAbility: getProgrammingAbility
}

getProgrammingAbility();    //  ShivaParvati
obj1.getProgrammingAbility();   // Haritha
obj2.getProgrammingAbility();   // Chandu

//

const obj3 = {
    name: 'Subodh',
    code(){
        console.log('a: ', this);
        // var self = this;
        var anotherFunction = function(){
            console.log('b: ', this);
        }

        anotherFunction();
    }
};

obj3.code();


