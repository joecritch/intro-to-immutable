arr.map(v => v.title);
arr.map(v => v.get("title"));

arr.filter(v => v.title === "Jeff");
arr.filter(v => v.get("title") === "Jeff");
