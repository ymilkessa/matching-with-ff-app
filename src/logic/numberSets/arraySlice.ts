import { createSlice } from "@reduxjs/toolkit";
import { generateShuffledCoprimePairs } from "../utils";
import { GameSize } from "../gameSettings/sizeSlice";
import { max } from "lodash";

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
      const { setASize, setBSize } = action?.payload as GameSize;
      // Use the largest size to create sets
      const { list1, list2 } = generateShuffledCoprimePairs(
        max([setASize, setBSize])
      );

      state.setA = list1;
      state.setB = list2;
    },
  },
});

export const { generateSets } = arraySlice.actions;
export default arraySlice.reducer;
