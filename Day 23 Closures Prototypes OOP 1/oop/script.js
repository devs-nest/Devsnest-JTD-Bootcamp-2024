// Function Contructor

    const programmer = new Function("name", "language", "this.name = name; this.language = language; return 'worked!!'");
    
    const subodhProgrammer = programmer("Subodh", "JavaScript");
    // we don't use Function contructor.

// Factory functions
    function programmer1 (name, language){
        return {
            name: name,
            language: language,
            doCoding: function (){
                return "I'm " + this.name + " coding in " + this.language;
            }
        }
    } 

    const subodhProgrammer1 = programmer1("Subodh", "JavaScript");
    subodhProgrammer1.doCoding();

    const hariProgrammer1 = programmer1("Hari", "C++");
    hariProgrammer1.doCoding();

    // to solve the problem of code/logic duplication

    const commonFunctionalitiesObject = {        
        doCoding: function (){
            return "I'm " + this.name + " coding in " + this.language;
        }
    }

    function programmer2 (name, language){
        return {
            name: name,
            language: language
        }
    } 

    const subodhProgrammer2 = programmer2("Subodh", "JavaScript");
    subodhProgrammer2.doCoding = commonFunctionalitiesObject.doCoding;

    const hariProgrammer2 = programmer2("Hari", "C++");
    hariProgrammer2.doCoding = commonFunctionalitiesObject.doCoding;

    // The problem is the code is not extensible as we increase the number of common functionalities
    // the code to use that also increases.
    // Imagine there are 500 such objects are there.


// Object.create
    // Pure prototypal inheritance

    const commonFunctionalitiesObject1 = {        
        doCoding: function (){
            return "I'm " + this.name + " coding in " + this.language;
        }
    }

    function programmer3 (name, language){
        const newProgrammer = Object.create(commonFunctionalitiesObject1);
        newProgrammer.name = name;
        newProgrammer.language = language;

        return newProgrammer;
    } 

    const subodhProgrammer3 = programmer3("Subodh", "JavaScript");
    subodhProgrammer3.doCoding();

    const hariProgrammer3 = programmer3("Hari", "C++");
    hariProgrammer3.doCoding();


//


