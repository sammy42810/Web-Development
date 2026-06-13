/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/
import { trimmedArrayStats, mergePairsUnique, commonElementsStable } from "./arrayUtils.js";
import { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained } from "./objectUtils.js";
import { findIsograms, weaveChars, spliceSwap } from "./stringUtils.js";

// TrimmedArrayStats Tests
// One Passing Case
try {  console.log(trimmedArrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20], 1)); // Should return { mean: 7.95, median: 7, mode: 5, range: 30.5, minimum: -5, maximum: 25.5, count: 11, sum: 87.5 }
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(trimmedArrayStats("banana", 1)); // Should throw an error
} catch (e) {
  console.error(e);
}

// MergePairsUnique Tests
// One Passing Case
try {
  console.log(mergePairsUnique(["foo", "bar"], [5, "John"], ["foo", "bar"], ["foo", "not bar"], ["foo", "not bar"])); // Should return {foo:['bar', 'not bar'], '5': ["John"]}
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(mergePairsUnique([4, 1, 2], [1,2])); // Should throw an error because arrays do not have exactly two elements
} catch (e) {
  console.error(e);
}

// commonElementsStable Tests
// One Passing Case
try {
  console.log(commonElementsStable([5,7,7,9],[20,5,7,5])); // Should return [5,7]
} catch (e) {
  console.error(e);
}

// One Failing Case 
try {
  console.log(commonElementsStable("test")); // Should throw an error
} catch (e) {
  console.error(e);
}

// DeepEqualityIgnore Tests
// One Passing Case -----
try {
  const a = {x: 1, meta: {updatedAt: "yesterday"}, y: 2};
  const b = {y: 2, x: 1, meta: {updatedAt: "today"}};
  console.log(deepEqualityIgnore(a, b, ["updatedAt"])); // Should return true
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  const a = {x: 1, meta: {updatedAt: "yesterday"}, y: 2};
  const b = {y: 2, x: 1, meta: {updatedAt: "today"}};
  console.log(deepEqualityIgnore(a, b)); // Should throw an error
} catch (e) {
  console.error(e);
}

// CommonKeyValuePaths Tests
// One Passing Case
try {
  const first = {name: {first: "Patrick", last: "Hill"}, age: 46, school: "Stevens"};
  const second = {name: {first: "Patrick", last: "Hill"}, age: 20, active: true};
  console.log(commonKeyValuePaths(first, second)); // Should return ["name.first", "name.last"]']
} catch (e) {
  console.error(e);
}

// One Failing Case -----
try {
  console.log(commonKeyValuePaths({}, {})); // Should return an error because there are no common key-value pairs
} catch (e) {
  console.error(e);
}

// calculateObjectChained Tests
// One Passing Case
try {
  console.log(calculateObjectChained({ a: 3, b: -7, c: 5 }, [n => n * 2, n => n - 1])); // Should return a: 1.71, b: 2.466, c: 2.08}
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(calculateObjectChained(123, [n => n * 2])); // Should throw an error
} catch (e) {
  console.error(e);
}

// FindIsograms Tests
// One Passing Case
try {
  console.log(findIsograms("Hi mom, At noon, I'm going to take my kayak to the lake")); // Should return ["Hi", "At", "I'm", "to", "take", "my", "to", "the", "lake"]
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(findIsograms(1)); // Should return error because input is not a string
} catch (e) {
  console.error(e);
}

// WeaveChars Tests
// One Passing Case
try {
  console.log(weaveChars("Daddy")); // Should return "D*$*#"
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(weaveChars(12345)); // Should throw an error because input is not a string
} catch (e) {
  console.error(e);
}

// SpliceSwap Tests
// One Passing Case
try {
  console.log(spliceSwap("Patrick", "Hill", 2)); // Should return "Hitrick | Pall"
} catch (e) {
  console.error(e);
}

// One Failing Case
try {
  console.log(spliceSwap("John")); // Should throw an error
} catch (e) {
  console.error(e);
}