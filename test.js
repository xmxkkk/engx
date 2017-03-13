'use strict'

let num=1<<1;
//10
let num2=-1>>>1;

let result=num & num2;

console.log(result.toString(2));


console.log((-1>>>1).toString(2));


console.log(((-1>>>1)|(1<<2))).toString(2))
