import { createSlice } from "@reduxjs/toolkit";
import { range } from "lodash";
import { BoxLocation } from "../../components/NumberBox/types";
import { SET_NUMBERS } from "../constants";

export const UNMATCHED_MARKER = -1;

export type Matching = [indexOnA: number, indexOnB: number];
export type MatchingObjects = [boxA: BoxLocation, boxB: BoxLocation];

export type MatchingRecords = {
  setAMatches: number[] | null;
  setBMatches: number[] | null;
  arrayOfMatches: Matching[];
};

const initialState: MatchingRecords = {
  setAMatches: null,
  setBMatches: null,
  arrayOfMatches: [],
};

export type MatchingParams = {
  matching: MatchingObjects;
  setASize: number;
  setBSize: number;
};

export const matchingsSlice = createSlice({
  name: "matchingsSlice",
  initialState,
  reducers: {
    addMatching: (state, action) => {
      const { matching, setASize, setBSize } = action.payload as MatchingParams;
      if (!state.setAMatches || !state.setBMatches) {
        state.setAMatches = range(0, setASize).map(
          (_index) => UNMATCHED_MARKER
        );
        state.setBMatches = range(0, setBSize).map(
          (_index) => UNMATCHED_MARKER
        );
        state.arrayOfMatches = [];
      }
      // console.log(`YOFTI-LOGS: state before:\n${JSON.stringify(state)}`);
      let [itemA, itemB] = matching;
      // Flip the items if they appear in reverse...
      if (itemA.row) {
        [itemB, itemA] = [itemA, itemB];
      }
      const newSetAMatches = [...state.setAMatches];
      newSetAMatches[itemA.index] = itemB.index;
      state.setAMatches = [...newSetAMatches];
      const newSetBMatches = [...state.setBMatches];
      newSetBMatches[itemB.index] = itemA.index;
      state.setBMatches = [...newSetBMatches];
      // state.setAMatches[itemA.index] = itemB.index;
      // state.setBMatches[itemB.index] = itemA.index;
      const newArrayOfMatches = [...state.arrayOfMatches];
      newArrayOfMatches.push([itemA.index, itemB.index]);
      state.arrayOfMatches = [...newArrayOfMatches];
      // console.log(`YOFTI-LOGS: state after:\n${JSON.stringify(state)}`);
    },
    clearAllMatchings: (state, action) => {
      if (state.setAMatches && state.setBMatches) {
        const setASize = state.setAMatches.length;
        const setBSize = state.setBMatches.length;
        state.setAMatches = range(0, setASize).map(
          (_index) => UNMATCHED_MARKER
        );
        state.setBMatches = range(0, setBSize).map(
          (_index) => UNMATCHED_MARKER
        );
        state.arrayOfMatches = [];
      }
    },
    removeMatching: (state, action) => {
      if (state.setAMatches && state.setBMatches) {
        const [indexOnA, indexOnB] = action.payload as Matching;
        const updatedMatchings = state.arrayOfMatches.filter(
          (match) =>
            match[SET_NUMBERS.SET_A] !== indexOnA ||
            match[SET_NUMBERS.SET_B] !== indexOnB
        );
        state.setAMatches[indexOnA] = UNMATCHED_MARKER;
        state.setBMatches[indexOnB] = UNMATCHED_MARKER;
        state.arrayOfMatches = updatedMatchings;
      }
    },
    unmatchBox: (state, action) => {
      if (state.setAMatches && state.setBMatches) {
        const boxToUnmatch = action.payload as BoxLocation;
        // First unset the match from each set's matching's array
        if (boxToUnmatch.row === SET_NUMBERS.SET_A) {
          const matchIndex = state.setAMatches[boxToUnmatch.index];
          if (matchIndex === UNMATCHED_MARKER) return;
          state.setBMatches[matchIndex] = UNMATCHED_MARKER;
          state.setAMatches[boxToUnmatch.index] = UNMATCHED_MARKER;
        } else {
          const matchIndex = state.setBMatches[boxToUnmatch.index];
          if (matchIndex === UNMATCHED_MARKER) return;
          state.setAMatches[matchIndex] = UNMATCHED_MARKER;
          state.setBMatches[boxToUnmatch.index] = UNMATCHED_MARKER;
        }
        // Then remove the tuple entry from the "array of matching tuples"
        state.arrayOfMatches = state.arrayOfMatches.filter((match) => {
          return match[boxToUnmatch.row] !== boxToUnmatch.index;
        });
      }
    },
  },
});

export const { addMatching, clearAllMatchings, removeMatching, unmatchBox } =
  matchingsSlice.actions;
export default matchingsSlice.reducer;
