arr.map(v => v.title);
arr.map(v => v.get("title"));

arr.filter(v => v.title === "Jeff");
arr.filter(v => v.get("title") === "Jeff");

arr.indexOf(3) !== -1
arr.includes(3) // ES2016 or Immutable
