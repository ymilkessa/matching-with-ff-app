import { createSlice } from "@reduxjs/toolkit";
import { generateShuffledCoprimePairs } from "../utils";
import { GameSize } from "../gameSettings/sizeSlice";

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
    generateSets: (state, action) => {
      // Fetch the game params from the payload
      const gameParams = action?.payload as GameSize;
      let setA: number[];
      let setB: number[];
      const { setASize, setBSize } = gameParams;
      // Use setB since it is always the largest value in the sets
      ({ list1: setA, list2: setB } = generateShuffledCoprimePairs(setBSize));
      // Splice setA to the desired size
      setA = setA.slice(0, setASize);

      state.setA = setA;
      state.setB = setB;
    },
  },
});

export const { generateSets } = arraySlice.actions;
export default arraySlice.reducer;
