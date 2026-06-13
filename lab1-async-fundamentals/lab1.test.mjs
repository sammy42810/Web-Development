//Sam Bryan
//I pledge my honor that I have abided by the Stevens Honor System

import * as lab1 from "./lab1.mjs";

// --- functionOne ---
console.log(lab1.functionOne([987, 1234, -49]));   // [30, 11, 17] 
console.log(lab1.functionOne([0, 9, 19]));          // [0, 9, 11]
console.log(lab1.functionOne([-99, 100, 55]));      // [27, 1, 11]
console.log(lab1.functionOne([1111, 999, 38]));     // [4, 36, 13]
console.log(lab1.functionOne([7, -3, 256]));        // [7, 3, 17]

// --- functionTwo ---
console.log(lab1.functionTwo(["hello", "world", "AEIOU"]));       // { hello: 2, world: 4, AEIOU: 0 }
console.log(lab1.functionTwo(["banana", "Programming", "sky"]));  // { banana: 2, Programming: 5, sky: 3 }
console.log(lab1.functionTwo(["xyz"]));                           // { xyz: 3 }
console.log(lab1.functionTwo([]));                                // {}
console.log(lab1.functionTwo(["B2B!!!", "Shh...", "rhythm"]));   // { 'B2B!!!': 1, 'Shh...': 2, rhythm: 5 }

// --- functionThree ---
console.log(lab1.functionThree("Hello world from Stevens"));        // { mostCommonLength: 5, words: 'Hello, world', averageLength: 5 }
console.log(lab1.functionThree("This is a test."));                 // { mostCommonLength: 1, words: 'a', averageLength: 3 }
console.log(lab1.functionThree("OneWord"));                         // { mostCommonLength: 7, words: 'OneWord', averageLength: 7 }
console.log(lab1.functionThree(""));                                // { mostCommonLength: 0, words: null, averageLength: 0 }
console.log(lab1.functionThree("I am programming now! now!"));      // { mostCommonLength: 4, words: 'now!, now!', averageLength: 4 }

// --- functionFour ---
console.log(lab1.functionFour([3, "guitar", 1, "bass", -10, "bass", 3]));  // [ 'bass', 'guitar', -10, 1, 3 ]
console.log(lab1.functionFour(["apple", "orange", "kiwi", 10, -2, 2]));    // [ 'apple', 'kiwi', 'orange', -2, 2, 10 ]
console.log(lab1.functionFour([100, "Zebra", "Ant", 50, -100]));            // [ 'Ant', 'Zebra', -100, 50, 100 ]
console.log(lab1.functionFour(["one", "two", "three", "two", 7, 8, 7]));   // [ 'two', 'one', 'three', 8, 7 ]
console.log(lab1.functionFour([1, -1, 2, -2, 0, "AaA", "bb", "bb!"]));    // [ 'bb', 'bb!', 'AaA', -2, 0, 2, -1, 1 ]