const obj = {
  firstName: "Jack",
  lastName: "Daniels"
};

const obj2 = obj;
obj2.firstName = "Jeff";

// obj === obj2 => true
// obj.firstName => "Jeff"
