class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName +' '+ person.middleInitial + ' ' + person.lastName;
}

let user = "Jane User";
let users = [0, 1, 2];
let interUse = {firstName: "Jane", lastName: "User"}
let classUse = new Student('Mike', 'M.', 'James');

document.body.innerHTML = greeter(classUse); 