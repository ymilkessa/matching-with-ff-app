import { createSlice } from "@reduxjs/toolkit";
import { BoxLocation } from "../../components/NumberBox/types";
import { Matching, MatchingObjects } from "./matchingsSlice";

export interface Markings {
  selectedBox?: BoxLocation;
  errorMatching?: Matching;
  cursorBox: BoxLocation;
}

const initialState: Markings = {
  cursorBox: { row: 0, index: 0 },
};

const markingSlice = createSlice({
  name: "markingsSlice",
  initialState,
  reducers: {
    addErrorMarks: (state, action) => {
      try {
        const givenMatching = action.payload as Matching;
        state.errorMatching = givenMatching;
      } catch (e: any) {
        throw Error(`Found an error when adding error marks:\n${e}`);
      }
    },
    addErrorMarksFromObjects: (state, action) => {
      const [setAObj, setBObj] = action.payload as MatchingObjects;
      const invalidMatch = [-1, -1];
      invalidMatch[setAObj.row] = setAObj.index;
      invalidMatch[setBObj.row] = setBObj.index;
      addErrorMarks(invalidMatch);
    },
    removeErrorMarks: (state) => {
      try {
        state.errorMatching = undefined;
      } catch (e: any) {
        throw Error(`Found an error when removing error marks:\n${e}`);
      }
    },
    addSelectionMarker: (state, action) => {
      try {
        state.selectedBox = action.payload as BoxLocation;
      } catch (e: any) {
        throw Error(`Found an error when adding selection mark`);
      }
    },
    removeSelectionMarker: (state, action) => {
      try {
        state.selectedBox = undefined;
      } catch (e: any) {
        throw Error(`Found an error when removing selection marker`);
      }
    },
    moveCursorMarker: (state, action) => {
      try {
        const cursorLoc = action.payload as BoxLocation;
        state.cursorBox = { ...cursorLoc };
      } catch (e: any) {
        throw Error(`Found an error when switching the cursor marker`);
      }
    },
  },
});

export const {
  addErrorMarks,
  addErrorMarksFromObjects,
  removeErrorMarks,
  addSelectionMarker,
  removeSelectionMarker,
  moveCursorMarker,
} = markingSlice.actions;
export default markingSlice.reducer;
