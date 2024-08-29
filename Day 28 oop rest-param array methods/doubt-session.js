function add(...args) {
    let result = null;

    debugger;

    args.forEach((x) => {
        if (isNaN(+(result + x))) {
            result = result
        } else {
            result += x
        }
    })
    return result;
}

console.log(typeof (add(2, "", 3, 4)))

// ----------------------------------------

function addingNNumbers(...args) {
    let result = null;
    if (Array.isArray(args)) {
        args.forEach(
            (x) => {
                if (Number.isNaN(+(result + x))) {
                    result = result;
                } else { // adding x 
                    result = result + x;
                }
            }
        );
    }

    return result;
}



// difference in isNaN and Number.isNaN

// isNaN: checks the input value to be "not a number".
// Number.isNaN: checks the input value to be NaN.




const persons = [
    {
        name: "Subodh",
        profession: "Software engineer",
        isCameraOn: true
    },

    {
        name: "Gowthami",
        profession: "Sr. Software engineer",
        isCameraOn: true
    },

    {
        name: "Haritha",
        profession: "Tech. Lead",
        isCameraOn: true
    },

    {
        name: "Supriya",
        profession: "Sr Tech. Lead",
        isCameraOn: false
    }
];


const subodhExist = persons.some((i) => i.name === "Subodh");

const harithaObject = persons.find((i) => i.name === "Haritha");

// const everyResult = persons.every(function (i) {
//     console.log(i);
//    return i.isCameraOn
// });

const someResult = persons.some(function (i) {
    console.log(i);
   return !i.isCameraOn
});

