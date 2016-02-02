const I = require("immutable");

const obj1 = new I.Map({
  firstName: "Paul",
  lastName: "Daniels"
});

const obj2 = obj1.set("firstName", "Jeff");

// obj1 !== obj2
// obj1.get('firstName') === "Paul"
