// Constructor function

function Programmer(name, language) {
    console.log(this);
    this.name = name;
    this.language = language;
    console.log(this);

    function localFunc() {
        return "something";
    }
}

Programmer.localFunc1 = function () {
    return "On Programmer";
}

Programmer.prototype.doCoding = function () {
    alert(localFunc());
    return `${this.name} is coding in ${this.language}`;
}

const subodhProgrammer = new Programmer("Subodh", "JavaScript");

// ES6 Classes

class Programmer1 {
    constructor(name, language) {
        this.name = name;
        this.language = language;
    }

    doCoding() {
        return `${this.name} is coding in ${this.language}`;
    }

    log() {
      
        return "Logging from Programmer1";
    }
}

// const subodhProgrammer1 = new Programmer1("Subodh", "JavaScript");

//subodhProgrammer1.doCoding();


// derived class
// sub class
// specialization from generalization/parent class
class JavaProgrammer extends Programmer1 {
    constructor(name, version) {
        const language = "Java";
        super(name, language);
        this.language = language;
        this.name = name;
        this.version = version;
    }

    specificJavaFunctionality() {
        return `Some specific functionality`;
    }

    log() {
        const result = super.log();
        console.log(result);
        return "Logging from JavaProgrammer";
    }
}


const subodhJavaProg = new JavaProgrammer("Subodh", "Latest Version");
subodhJavaProg.log();