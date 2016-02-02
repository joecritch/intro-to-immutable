const myFunc = function (obj, cb) {
  cb(obj);
};
const myObj = { firstName: "Jack", lastName: "Daniels" };
Object.freeze(myObj);
myFunc(myObj, (obj) => {
  // Change will throw (in strict mode)
  obj.firstName = "Paul";
});
