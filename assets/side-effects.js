function myFunc(obj, cb) {
  console.log(obj); // ==> original
  cb(obj);
  console.log(obj); // ==> anything!
};
