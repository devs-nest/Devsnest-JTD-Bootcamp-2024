// Memory

function getEmployee(employeedId) {
    const employeeDatabase = new Array(100000).fill("Employee..");
    console.log("created database.!")
    return employeeDatabase[employeedId];
}
getEmployee(100);
getEmployee(200);
getEmployee(300);

// The above code is not optimized and efficient from memory perspective.
// so let us do it.


let employeeDatabase = [];
function createEmployeeDatabase() {
    if (!employeeDatabase || employeeDatabase.length == 0) {
        employeeDatabase = new Array(100000).fill("Employee..");
        console.log("Created employee database!")
    }
}

function getEmployeeOptimized(employeedId) {
    if (employeedId >= 0 && employeeDatabase && employeeDatabase.length) {
        return employeeDatabase[employeedId] + " is " + employeedId;
    }
}

function createEmployeeDatabase(employeedId) {
    let employeeDatabase = [];
    employeeDatabase = new Array(100000).fill("Employee..");
    console.log("Created employee database!")

    return function (employeeId) {
        if (employeeId >= 0 && employeeDatabase && employeeDatabase.length) {
            return employeeDatabase[employeeId] + " is " + employeeId;
        }
    }
}



// Encapsulation:-
// problem statement:-
// We want to monitor selfstudy and expose results and time which is gone without self study.
// result will be benefits of self study.

function dailyRoutine() {
    let elapsedTime = 0;
    let confidenceLevel = 0;

    function tickTime() {
        elapsedTime = elapsedTime + 1;
        console.log(elapsedTime);

        if (elapsedTime > 0 && elapsedTime % 5 == 0) {
            doSelfStudy();
        }
    }

    setInterval(tickTime, 1000);

    function doSelfStudy() {
        elapsedTime = 0;
        confidenceLevel++;
    }

    function timeWithoutSelfStudy() {
        return "Time without self study is " + elapsedTime;
    }

    function getConfidenceLevel(){
        return confidenceLevel;
    }

    return {
        getTimeWithoutSelfStudy: timeWithoutSelfStudy,
        getConfidenceLevel: getConfidenceLevel
    }
}

