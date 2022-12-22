import { generateShuffledCoprimePairs } from "./utils";

export const runUpdaters = (state: any, action: { type: string }) => {
  switch (action.type) {
    case "setNumberSets":
      const { list1: setA, list2: setB } = generateShuffledCoprimePairs();
      state.setA = setA;
      state.setB = setB;
      break;
    default:
      break;
  }
};
