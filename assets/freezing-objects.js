const myObj = { firstName: "Jack" };
Object.freeze(myObj);

// This will throw an exception
// in strict mode
myObj.firstName = "Paul";
