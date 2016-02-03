// Mutative
obj.author.firstName = "Steve";

// Cloning (ES2015)
obj = Object.assign({}, obj, {
  author: Object.assign({}, obj.author, {
    firstName: "Steve"
  }
)})

// Immutable
obj = obj.updateIn(["author"],
  map => map.set("firstName", "Steve")
);
