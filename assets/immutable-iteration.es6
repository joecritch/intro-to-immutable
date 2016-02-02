arr.indexOf(3) !== -1
arr.includes(3)

arr.map(v => v.title);
arr.map(v => v.get("title"));

arr.filter(v => v.title === "Jeff");
arr.filter(v => v.get("title") === "Jeff");
