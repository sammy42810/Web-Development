/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES

  Samantha Bryan
  I pledge my honor that I have abided by the Stevens Honor System.
*/

let deepEqualityIgnore = (obj1, obj2, ignoreKeys) => {
  //deepEqualityIgnore
  if (typeof obj1 === "undefined") throw "Error: obj1 is not provided";
  if (typeof obj2 === "undefined") throw "Error: obj2 is not provided";
  if (typeof obj1 !== "object" || Array.isArray(obj1)) throw "Error: obj1 is not an object";
  if (typeof obj2 !== "object" || Array.isArray(obj2)) throw "Error: obj2 is not an object";
  if (typeof ignoreKeys === "undefined") throw "Error: ignoreKeys is not provided";
  if (!Array.isArray(ignoreKeys)) throw "Error: ignoreKeys is not an array";
  if (ignoreKeys.length === 0) throw "Error: ignoreKeys is empty";
  for (const key of ignoreKeys) {
    if (typeof key !== "string") throw "Error: ignoreKeys contains non-string elements";
  }

  const compareObjects = (o1, o2) => {
    const keys1 = Object.keys(o1).filter(key => !ignoreKeys.includes(key));
    const keys2 = Object.keys(o2).filter(key => !ignoreKeys.includes(key));

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;

      const val1 = o1[key];
      const val2 = o2[key];

      if (typeof val1 === "object" && typeof val2 === "object") {
        if (!compareObjects(val1, val2)) return false;
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  }
};

let commonKeyValuePaths = (obj1, obj2) => {
  //commonKeyValuePaths
  if (typeof obj1 === "undefined") throw "Error: obj1 is not provided";
  if (typeof obj2 === "undefined") throw "Error: obj2 is not provided";
  if (typeof obj1 !== "object" || Array.isArray(obj1)) throw "Error: obj1 is not an object";
  if (typeof obj2 !== "object" || Array.isArray(obj2)) throw "Error: obj2 is not an object";

  let paths = [];

  const findPaths = (o1, o2, currentPath) => {
    for (const key in o1) {
      if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (typeof o1[key] === "object" && typeof o2[key] === "object") {
          findPaths(o1[key], o2[key], newPath);
        } else if (o1[key] === o2[key]) {
          paths.push(newPath);
        }
      }
    }
  };

  findPaths(obj1, obj2, "");

  return paths.sort();
};

let calculateObjectChained = (object, funcs) => {
  //calculateObjectChained
  if (typeof object === "undefined") throw "Error: object is not provided";
  if (typeof funcs === "undefined") throw "Error: funcs is not provided";
  if (typeof object !== "object" || Array.isArray(object)) throw "Error: object is not an object";
  if (!Array.isArray(funcs)) throw "Error: funcs is not an array";
  for (const func of funcs) {
    if (typeof func !== "function") throw "Error: funcs contains non-function elements";
  }

  let result = {};

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      let value = object[key];
      for (const func of funcs) {
        value = func(value);
      }
      result[key] = Number(Math.cbrt(Math.abs(value)).toFixed(3));
    }
  }

  return result;
};

export { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained };
