//Sam Bryan
//I pledge my honor that I have abided by the Stevens Honor System

export const functionOne = (arr) => {
  let returnarr = [];
  for (let i = 0; i < arr.length; i++) {
    let num = Math.abs(arr[i]);           
    let digits = String(num).split("").map(Number);   
    let total = 0;


    if (digits.length === 1) {
      returnarr[i] = digits[0];
      continue;
    }
    
    else {
      while (digits.length > 1) {
        let sum = 0;
        for (let j = 0; j < digits.length; j++) {
          sum += digits[j];
        }
        total += sum;                                   
        digits = String(sum).split("").map(Number);     
      }

      returnarr[i] = total;
    }
  }
  return returnarr;
};


export const functionTwo = (arr) => {
  const result = {};                       
  if (arr.length === 0) return result;

  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);  

  for (let i = 0; i < arr.length; i++) {
    const distinctConsonants = new Set();  
    const word = arr[i];

    for (const char of word) {             
      const lower = char.toLowerCase();   
      if (lower >= 'a' && lower <= 'z' && !vowels.has(lower)) {
        distinctConsonants.add(lower);
      }
    }

    result[word] = distinctConsonants.size;
  }

  return result;
};

export const functionThree = (str) => {
  if (str === "") {
    return { mostCommonLength: 0, words: null, averageLength: 0 };
  }

  const wordsarr = str.split(" ");
  let total_length = 0;                   

  for (const word of wordsarr) {
    total_length += word.length;
  }

  const averageLength = Math.floor(total_length / wordsarr.length);

  const lengthFreq = {};
  for (const word of wordsarr) {
    const len = word.length;
    lengthFreq[len] = (lengthFreq[len] || 0) + 1;
  }

  let mostCommonLength = null;
  let highestFreq = 0;

  for (const len in lengthFreq) {
    const numLen = Number(len);
    const freq = lengthFreq[len];

    if (freq > highestFreq || (freq === highestFreq && numLen < mostCommonLength)) {
      highestFreq = freq;
      mostCommonLength = numLen;
    }
  }

  const matchingWords = wordsarr.filter(word => word.length === mostCommonLength); 
  const words = matchingWords.join(", ");

  return { mostCommonLength, words, averageLength };
};

export const functionFour = (arr) => {
  if (arr.length === 0) return [];

  const seen = new Set();
  const unique = arr.filter(item => {
    if (seen.has(item)) return false;
    seen.add(item);
    return true;
  });

  const strings = unique.filter(item => typeof item === "string");
  const numbers = unique.filter(item => typeof item === "number");

  const vowelCount = str => (str.match(/[aeiou]/gi) || []).length;

  strings.sort((a, b) => {
    const diff = vowelCount(a) - vowelCount(b);
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  numbers.sort((a, b) => {
    const aEven = a % 2 === 0 ? 0 : 1;
    const bEven = b % 2 === 0 ? 0 : 1;
    if (aEven !== bEven) return aEven - bEven;
    return a - b;
  });

  return [...strings, ...numbers];
};

export const studentInfo = {
  firstName: 'Samantha',
  lastName: 'Bryan',
  studentId: '20234836'
};