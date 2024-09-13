// main.js

import { user as existingUser } from './user.js';
import { user as adminUser} from './admin.js';

// import { welcomeUser } from './greeter.js';

import * as greeter from './greeter.js';

greeter.doAnotherThing();
greeter.doSomething();

greeter.welcomeUser(greeter.userModule.user.name);

// alert(isModule);