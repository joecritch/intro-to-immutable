function myFunc(obj, cb) {
  cb(obj);
}
const myObj = { firstName: "Jack" };
Object.freeze(myObj);
myFunc(myObj, (obj) => {
  // Change will throw (in strict mode)
  obj.firstName = "Paul";
});
