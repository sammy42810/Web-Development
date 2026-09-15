/* Todo: Implment the functions below and then export them using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES

  Samantha Bryan
  I pledge my honor that I have abided by the Stevens Honor System.
*/

let trimmedArrayStats = (array, trimCount) => {
  //trimmedArrayStats
  if (typeof array === "undefined") throw "Error: array is not provided";
  if (!Array.isArray(array)) throw "Error: array is not an array";
  for (const element of array) {
    if (typeof element !== "number") throw "Error: array contains non-number elements";
  }
  if (typeof trimCount === "undefined") throw "Error: trimCount is not provided";
  if (typeof trimCount !== "number") throw "Error: trimCount is not a number";
  if (trimCount < 0) throw "Error: trimCount is less than 0";
  if (trimCount * 2 >= array.length) throw "Error: trimCount is too large for the array";
 
  let sortedArray = array.sort((a, b) => a - b);
  let trimmedArray = sortedArray.slice(trimCount, sortedArray.length - trimCount);

  trimmedArray = trimmedArray.map(num => Math.round(num * 100) / 100);

  let mean = trimmedArray.reduce((acc, val) => acc + val, 0) / trimmedArray.length;

  let median;
  if (trimmedArray.length % 2 === 0) {
    median = (trimmedArray[trimmedArray.length / 2 - 1] + trimmedArray[trimmedArray.length / 2]) / 2;
  } else {
    median = trimmedArray[Math.floor(trimmedArray.length / 2)];
  }

  let mode;
  if (trimmedArray.length === 0) {
    mode = 0;
  } else {
    
    let modeCount = {};
    for (const element of trimmedArray) {
      if (modeCount[element]) {
        modeCount[element]++;
      } else {
        modeCount[element] = 1;
      }
    }
    let maxCount = 0;
    for (const key in modeCount) {
      if (modeCount[key] > maxCount) {
        maxCount = modeCount[key];
        mode = [Number(key)];
      } else if (modeCount[key] === maxCount) {
        mode.push(Number(key));
      }
    }
    if (maxCount === 1 && trimmedArray.length > 1) {
      mode = 0;
    }
  }

  let range = trimmedArray[trimmedArray.length - 1] - trimmedArray[0];

  let minimum = trimmedArray[0];

  let maximum = trimmedArray[trimmedArray.length - 1];

  let count = trimmedArray.length;

  let sum = 0;
  for (const element of trimmedArray) {
    sum += element;
  }

  return {
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    mode: mode,
    range: Math.round(range * 100) / 100,
    minimum: Math.round(minimum * 100) / 100,
    maximum: Math.round(maximum * 100) / 100,
    count: count,
    sum: Math.round(sum * 100) / 100
  };
};

let mergePairsUnique = (...args) => {
  /*
  mergePairsUnique
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length === 0) throw "Error: no arrays provided";
  for (const array of args) {
    if (!Array.isArray(array)) throw "Error: all arguments must be arrays";
    if (array.length != 2) throw "Error: all arrays must have exactly two elements";
  }

  let result = {};

  for (const pair of args) {
    let key = pair[0];
    let value = pair[1];
    if (key in result) {
      if (!result[key].includes(value)) {
        result[key].push(value);
      }
    } else {
      result[key] = [value];
    }
  }

  return result;

};

let commonElementsStable = (...args) => {
  /*commonElementsStable
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length === 0) throw "Error: no arrays provided";
  for (const array of args) {
    if (!Array.isArray(array)) throw "Error: all arguments must be arrays";
  }

  if(args.length < 2) throw "Error: at least two arrays must be provided";

  let commonElements = [];

  for (const element of args[0]) {
    let isCommon = true;
    for (let i = 1; i < args.length; i++) {
      if (!args[i].includes(element)) {
        isCommon = false;
        break;
      }
    }
    if (isCommon && !commonElements.includes(element)) {
      commonElements.push(element);
    }
  }

  return commonElements;
};

export { trimmedArrayStats, mergePairsUnique, commonElementsStable };