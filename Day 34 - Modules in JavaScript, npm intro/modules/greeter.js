// greeter.js

import * as userModule from './user.js';
// import { user as adminUser } from './admin.js';

export function welcomeUser(user = null) {
    alert(`Hello, ${user}`);
}

function doSomething() {
    console.log('doSomething');
}

function doAnotherThing() {
    console.log('doAnotherThing');
}

export { doSomething, doAnotherThing, userModule }

// below is another example of aggregation and exporting from within
// export * from  './user.js'

// ....

// let isModule = true;
// export { isModule as default }