/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES

  Samantha Bryan
  I pledge my honor that I have abided by the Stevens Honor System.
*/

let findIsograms = (str) => {
  //findIsograms
  if (typeof str === "undefined") throw "Error: str is not provided";
  if (typeof str !== "string") throw "Error: str is not a string";

  let words = str.split(/[\s,]+/);
  let isograms = [];

  for (const word of words) {
    let lowerCaseWord = word.toLowerCase();
    let charSet = new Set();
    let isIsogram = true;

    for (const char of lowerCaseWord) {
      if (charSet.has(char)) {
        isIsogram = false;
        break;
      }
      charSet.add(char);
    }

    if (isIsogram) {
      isograms.push(word);
    }
  }

  return isograms;
};

let weaveChars = (str) => {
  //weaveChars
  if (typeof str === "undefined") throw "Error: str is not provided";
  if (typeof str !== "string") throw "Error: str is not a string";

  let result = "";
  let count = 0;

  for (const char of str) {
    if (/[a-zA-Z]/.test(char)) {
      count++;
      if (count % 2 === 0) {
        result += "*";
      } else if (count % 3 === 0) {
        result += "$";
      } else if (count % 5 === 0) {
        result += "#";
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }

  return result;

};

let spliceSwap = (str1, str2, num) => {
  //spliceSwap
  if (typeof str1 === "undefined") throw "Error: str1 is not provided";
  if (typeof str2 === "undefined") throw "Error: str2 is not provided";
  if (typeof num === "undefined") throw "Error: num is not provided";
  if (typeof str1 !== "string") throw "Error: str1 is not a string";
  if (typeof str2 !== "string") throw "Error: str2 is not a string";
  if (typeof num !== "number") throw "Error: num is not a number";
  if (num < 0) throw "Error: num must be non-negative";
  if (num > str1.length || num > str2.length) throw "Error: num must be less than or equal to the length of both strings";

  let newStr1 = str2.slice(0, num) + str1.slice(num);
  let newStr2 = str1.slice(0, num) + str2.slice(num);

  return newStr1 + " | " + newStr2; 
};

export { findIsograms, weaveChars, spliceSwap };