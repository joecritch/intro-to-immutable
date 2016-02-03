// Arrays
let names = ["Jeff", "Paul"];
names.push("Jack");
names[2]; // === "Jack"

// Immutable Lists
names = new I.List(["Jeff", "Paul"]);
names = names.push("Jack");
names.get(2); // === "Jack"
