// Arrays
let firstNames = ["Jeff", "Paul", "Jack"];
let names = [];
names.push(`${firstNames[0]} Daniels`);

// Immutable Lists
firstNames = new I.List(["Jeff", "Paul", "Jack"]);
names = new I.List();
names = names.push(
  `${firstNames.get(0)} Daniels`
);
