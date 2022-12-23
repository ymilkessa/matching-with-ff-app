import { createSlice } from "@reduxjs/toolkit";
import { generateShuffledCoprimePairs } from "./utils";

export interface ArraySlice {
  setA: number[];
  setB: number[];
}

const { list1, list2 } = generateShuffledCoprimePairs();

const initialState: ArraySlice = { setA: list1, setB: list2 };

export const arraySlice = createSlice({
  name: "setGenerator",
  initialState,
  reducers: {
    generateSets: (state) => {
      const { list1: setA, list2: setB } = generateShuffledCoprimePairs();
      state.setA = setA;
      state.setB = setB;
    },
  },
});

export const { generateSets } = arraySlice.actions;
export default arraySlice.reducer;
