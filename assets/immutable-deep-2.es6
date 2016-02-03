// Spread syntax (2015)
obj = { ...obj,
  author: { ...obj.author,
    firstName: "Steve"
  }
};

// Immutable
obj = obj.updateIn(["author"],
  map => map.set("firstName", "Steve")
);
