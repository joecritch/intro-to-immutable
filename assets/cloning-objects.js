const obj1 = {
  firstName: "Jack",
  lastName: "Daniels"
};
const obj2 = Object.assign({}, obj1); // ES2015
// ... or jQuery.extend({}, obj1);

obj2.firstName = "Jeff";
// (obj1.firstName) ==> "Jack"
// (obj1 === obj2) ==> false
