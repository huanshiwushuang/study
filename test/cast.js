const { parse, print } = require("recast");
const fs = require("fs");




var source = fs.readFileSync('./index.js').toString();

console.log(parse(source));
