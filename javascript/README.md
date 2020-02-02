#### higher order function
- function takes callback function as parameters or return a function

arrHandle(arr, cb) {
    let arrRes = [];
    for (let i = 0; i < arr.length, i++) {
        arrRes.push(cb(arr[i]));
    }
    return arrRes;
}

#### IIFE
- ??? Application

#### closure 
- An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned
- after the function returned and the execution stack is gone, the variable object is still in the memory
function debug(name) {
    // closure: the function returned still gets the variable name despite scope
    return function(string) {
        console.log(`[${name}] ${string}`);
    }
}

const log = debug('Name');
log('string');

// ??? application of closure

// spread
const a = [1,2,3];
const b = [0, ...a, 4];

console.log(b);

// shadow-cloning for object
const obj1 =  {
    a: 1,
    b: 2
}

const obj2 =  {
    c: 3,
    d: 4
}

const clonedObj = {...obj1};

const mergedObj = {...obj1, ...obj2};

console.log(clonedObj, mergedObj);

##### Loop

- Avoid using for/in over an array unless you're certain you mean to iterate over non-numeric keys and //inherited keys
- for/in and forEach() skip empty elements, also known as "holes", in the array.
- for, for/in, and for/of retain the outside scope's value of this, but the forEach() callback will have a different this unless you use an arrow function. ---> use arrow function for forEach
-  To access the current array index in a for/of loop, you can use the Array#entries() function.
for (const [i, v] of arr.entries()) {
  console.log(i, v); // Prints "0 a", "1 b", "2 c"
}

#### docs
- for of
+ The for...of statement creates a loop iterating over iterable objects, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set
+ Not iterate 'string' properties
- for in
+ A for...in loop only iterates over enumerable, non-Symbol properties
+ The loop will iterate over all enumerable properties of the object itself and those the object inherits from its constructor's prototype  --> use getOwnPropertyNames() or perform a hasOwnProperty() check
+ for...in should not be used to iterate over an Array where the index order is important. --> should use for of and forEach for array

- Any value that is not false, undefined, null, 0, -0, NaN, or the empty string (""), and any object, including a Boolean object whose value is false, is considered truthy 

- At the top level of programs and functions, let, unlike var, does not create a property on the global object. For example:
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined

- export and import

+ Named exports are useful to export several values. During the import, it is mandatory to use the same name of the corresponding object.

// module "my-module.js"
function cube(x) {
  return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

var graph = {
  options: {
      color:'white',
      thickness:'2px'
  },
  draw: function() {
      console.log('From graph draw function');
  }
}

export { cube, foo, graph };

////////////

import { cube, foo, graph } from './my-module.js';

graph.options = {
    color:'blue',
    thickness:'3px'
};
 
graph.draw();
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888


///////////////

-  a default export can be imported with any name . export a single value or to have a fallback value for your module

// module "my-module.js"

export default function cube(x) {
  return x * x * x;
}

////////////////

import cube from './my-module.js';
console.log(cube(3)); // 27

aggregate submodules together in a parent module so that they are available to import from that module.

// In parentModule.js
export { myFunction, myVariable } from 'childModule1.js';
export { myClass } from 'childModule2.js';
// In top-level module
import { myFunction, myVariable, myClass } from 'parentModule.js'

Import a single export from a moduleSection
Given an object or value named myExport which has been exported from the module my-module either implicitly (because the entire module is exported) or explicitly (using the export statement), this inserts myExport into the current scope.
```
import {myExport} from '/modules/my-module.js';

import {foo, bar} from '/modules/my-module.js';

import {reallyReallyLongModuleExportName as shortName}
  from '/modules/my-module.js';
```
- Array.concat
```
var new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])
```
    +  returns a shallow copy that contains copies of the same elements combined from the original arrays.
    + Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
    + Data types such as strings, numbers and booleans (not String, Number, and Boolean objects): concat copies the values of strings and numbers into the new array.

- Array.every
    + every() method tests whether all elements in the array pass the test implemented by the provided function
    + arr.every(callback(element[, index[, array]])[, thisArg])
    + callback is invoked with three arguments: the value of the element, the index of the element, and the Array object being traversed.
```
arr.every((elem,index,arr)=>{
  arr[index+1]-=1
  console.log(`[${arr}][${index}] -> ${elem}`)
  return elem < 2 
})
```
