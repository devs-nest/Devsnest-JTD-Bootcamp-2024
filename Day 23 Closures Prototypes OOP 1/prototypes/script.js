const programmer = {
    name: "",
    programmingLanguages: [],
    doCoding: function (langugage) {
        const indexOfLanguage = this.programmingLanguages.indexOf(langugage);
        if (indexOfLanguage > -1) {
            return "I'm " + this.name + " coding in " + this.programmingLanguages[indexOfLanguage];
        } else {
            return "You cannot code.";
        }
    },
    introduce: function () {
        return "I'm " + this.name + ", a software programmer.";
    }
}

const subodhObj = {
    name: "Subodh",
    introduce: function () {
        return "My name is " + this.name;
    }
}

//const subodhCoder = programmer.doCoding.bind(subodhObj);
// bind is not going to work when need of properties increases.

subodhObj.__proto__ = programmer;

subodhObj.programmingLanguages.push("JavaScript");
subodhObj.doCoding("JavaScript");
subodhObj.introduce();

for (const prop in subodhObj) {
    if (subodhObj.hasOwnProperty(prop)) {
        console.log("subodhObj: ", prop);
    } else {
        console.log(prop);
    }
}