import { shuffle } from "lodash";

const NUMBER_OF_PAIRS = 9;
const LIST_OF_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];
export const NUM_FACTORS = 6;

/**
 * Returns a partially random selection of primes
 * @returns {number[]}
 */
const getPoolOfFactors = (numOfFactors: number) => {
  const listOfPrimes = [...LIST_OF_PRIMES];
  const chosenFactors = new Array(numOfFactors);
  let index: number | null = null;
  for (let k = 0; k < NUM_FACTORS; k++) {
    // 'index' has a higher chance of being a smaller number
    index = Math.floor(Math.pow(Math.random(), 4) * listOfPrimes.length);

    // Add the chosen entry to the array
    chosenFactors[k] = listOfPrimes[index];

    // Remove that entry from the list.
    listOfPrimes.splice(index, 1);
  }
  return chosenFactors;
};

/**
 * Return the result of multiplying some of the numbers in the given set
 */
const getRandomMultiple = (listOfFactors: number[]) => {
  let product = 1;
  let tempProduct = 1;
  while (tempProduct < 1000) {
    product = tempProduct;
    if (product > 5 && Math.random() > 0.95) {
      break;
    }
    const nextIndex = Math.floor(Math.random() * listOfFactors.length);
    tempProduct = tempProduct * listOfFactors[nextIndex];
  }
  return product;
};

/**
 * Generate a pair of coprimes from a list of prime
 * factors
 */
const getRandomCoprimePair = (listOfFactors: number[]) => {
  const secondHalfList = shuffle([...listOfFactors]);
  const halfIndex = Math.ceil(listOfFactors.length / 2);
  const firstHalfList = secondHalfList.splice(0, halfIndex);
  const num1 = getRandomMultiple(firstHalfList);
  const num2 = getRandomMultiple(secondHalfList);
  return [num1, num2];
};

/**
 * Generate pairs of coprimes and shuffle them.
 */
export const generateShuffledCoprimePairs = (
  noOfPairs: number = NUMBER_OF_PAIRS,
  noOfFactors: number = NUM_FACTORS
) => {
  let set1 = [];
  let set2 = [];
  const poolOfFactors = getPoolOfFactors(noOfFactors);

  for (let i = 0; i < noOfPairs; i++) {
    const [num1, num2] = getRandomCoprimePair(poolOfFactors);
    set1.push(num1);
    set2.push(num2);
  }
  return {
    list1: shuffle(set1),
    list2: shuffle(set2),
  };
};

/**
 * Returns true if the given numbers are coprime
 */
export const numbersAreCoprime = (numA: number, numB: number) => {
  const minNum = Math.min(numA, numB);
  const sqrtMin = Math.sqrt(minNum);
  // First check the primes less than the sqrtMin
  for (let i = 0; i < LIST_OF_PRIMES.length; i++) {
    const primeNum = LIST_OF_PRIMES[i];
    if (primeNum > sqrtMin) {
      break;
    }
    if (numA % primeNum === 0 && numB % primeNum === 0) {
      return false;
    }
  }
  // Then check the minNum itself.
  if (numA % minNum === 0 && numB % minNum === 0) {
    return false;
  }
  return true;
};
