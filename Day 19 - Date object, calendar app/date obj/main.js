const today = new Date();
console.log(today);


console.log("Year", today.getFullYear());
// starts from 0
console.log("Month", today.getMonth());
console.log("Date", today.getDate())
// day also starts from 0 - Sun = 0, Mon=1 ...Sat= 6
console.log("Day of the week", today.getDay());

// year, monthIndex, date
console.log(new Date(2022, 7, 15))

console.log(new Date().toString())
console.log(new Date().toDateString())
console.log(new Date().toLocaleDateString())

const newDate = new Date();
newDate.setDate(17)
newDate.setMonth(5);
newDate.setFullYear(2025);
console.log(newDate);

// time part

console.log(today.getHours())
console.log(today.getMinutes())
console.log(today.getSeconds())

newDate.setHours(13) // 1pm
newDate.setMinutes(13) // 13 minutes
newDate.setSeconds(13) // 13 seconds

console.log(newDate)
console.log(newDate.toTimeString())
console.log(newDate.toLocaleTimeString())

// getTime function
// returns the number of milliseconds that have been elapsed since 1970

console.log(today.getTime()) // number of milliseconds since 1970 till today



console.log(new Date(1586111400000))
