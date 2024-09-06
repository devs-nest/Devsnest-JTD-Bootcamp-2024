class Car {
    // fields, instance variable - public, private
    // methods - functions defined inside the class

    #thisIsAPrivateField = "Has four wheels";
    color;

    static hasGearbox = true;
    constructor(brandName, engineCapacity, color) {
        this.brandName = brandName;
        this.engineCapacity = engineCapacity;
        this.color = color;
    }

    static someDefaultFunctionality() {
        return `This car has a gearbox = ${Car.hasGearbox}`;
    }

    get accessPrivateField() {
        return this.#thisIsAPrivateField;
    }

    getPrivateField() {
        return this.#thisIsAPrivateField;
    }
}

let car = new Car("Suzuki", 1200);
console.log(car.color);
// console.log(car.#thisIsAPrivateField);


console.log(car.brandName);
console.log(car.engineCapacity);
console.log(car.accessPrivateField);

let toyotaFortuner = new Car("Toyota", 2000, "blue");
console.log(toyotaFortuner);
let nissanMagnite = new Car("Nissan", 1600, "violet");
console.log(nissanMagnite);

Car.prototype.run = function () {
    console.log(`${this.brandName} is running`);

}



let mercedes = { brandName: "Mercedes", engineCapacity: 2600, color: "black" }
console.log(mercedes);





