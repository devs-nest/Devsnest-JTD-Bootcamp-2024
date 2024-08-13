function a() {
    'use strict';
}
//

//
function greet() {
    console.log('Good Morning!');
}

greet();

greet.call();

//purpose

let player1 = {
    name: "Haritha",
    totalScore: 20,
    scorePoints: function (num1) {
        this.totalScore = this.totalScore + num1;
        return this.name + "'s total Score is " + this.totalScore;
    }
};


let player2 = {
    name: "Gowthami",
    totalScore: 10
}

player1.scorePoints.call();
player1.scorePoints.apply(player2, 30);
const bindedOnPlayer2 = player1.scorePoints.bind(player2, 100);

// currying with help of bind()

function add(a, b) {
    return a + b;
}

const addBy5 = add.bind(this, 5);
const addBy50 = add.bind(this, 50);


// functions are objects

// 1.
function firstWay() {
    return 'nice and easy';
}

firstWay();

// 2.

let obj = {
    secondWay: function () {
        return "Second Way is method()"
    }
};

obj.secondWay();

// 3.
function thirdWay() {
    return "This is Third Way.";
}

thirdWay.call();

// 4. 

function funcAsObj() {
    return "function as object";
}

funcAsObj.prop1 = "Hiiiiiiiiiiiiiiii";

const newDynamicFunc = new Function("num1", "return num1 + 'Hello, I am dynamically created.'");  // 5. Function Constructor 


// pseudo code
//   funcAsObj = {
//     prop1: "",
//     name: 'funcAsObj',
//     (),

//   }

// First Class Citizens

// can be assigned to a variable.
let someVar = function () {
    return "somevar";
}

// we can pass function as an argument.

function someFunc(fn) {
    return fn();
}

someFunc(function () { return "My value." });

function displayMyName(nameFunc) {
    const name = nameFunc();
    console.log(name);
}

function getMyName() {
    return "Subodh Sant";
}

displayMyName(getMyName);

// we can return a function from another function

function funcReturningFunc(fn) {
    return fn;  // this is returning not invoking.
}

// HOF

const usersDB = [];
for (let i = 0; i < 10000; i++) {
    usersDB.push(i);
}

// Whether User is valid or not
function authenticate(userId) {
    return (usersDB && usersDB.length && usersDB[userId] >= 0 && usersDB[userId] < 10000) ? true : false;
}

// What priviledges user is having
function authorize(userId, role) {
    if ((usersDB && usersDB.length && usersDB.indexOf(userId) !== -1) || !role) {
        if (role === 'X-User') {
            return 1;
        } else if (role === 'X-Admin') {
            return 2;
        } else {
            return 0;
        }
    } else {
        return -1;
    }
}

function createTemporaryAccessCard(userId, role, authen, autho) {
    if (authen(userId) && autho(userId, role) > 0) {
        const newCard = {
            id: 100,    // should be dynamic
            userId: userId,
            role: role,
            accessGranted: true
        }

        return newCard;
    } else {
        null;
    }
}

function checkInAuthority(userid, role) {
   return createTemporaryAccessCard(userid, role, authenticate, authorize);
}

const checkInSubodh = checkInAuthority(100, "X-User");
checkInSubodh


// Closures

    function familyHeirarchy(){
        const grandFather = "Dadaji";
        const something = "SomeTHING";
        debugger;
        return function b() {
            const father = "Pitaji";
            console.log(grandFather, father);
            debugger;
            return function c(){
                const son = "Betaji";
                let cThing = something;
                console.log(grandFather, "=>", father, "=>", son);
                debugger;
            }
        }
    }

    familyHeirarchy()()()




