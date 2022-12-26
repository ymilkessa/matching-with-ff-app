import { createSlice } from "@reduxjs/toolkit";
import { BoxLocation } from "../../components/NumberBox/types";

export interface SelectionAndCursor {
  selection: BoxLocation;
  cursor: BoxLocation;
}

const initialState: SelectionAndCursor = {
  selection: {
    row: -1,
    index: -1,
  },
  cursor: { row: -1, index: -1 },
};

export const selectionSlice = createSlice({
  name: "selectionAndCursor",
  initialState,
  reducers: {
    moveCursorTo: (state, action) => {
      const { row: cursorSet, index: cursorIndex } =
        action.payload as BoxLocation;
      state.cursor.index = cursorIndex;
      state.cursor.row = cursorSet;
    },
    moveSelectionTo: (state, action) => {
      const { row: selectionSet, index: selectionIndex } =
        action.payload as BoxLocation;
      state.selection.row = selectionSet;
      state.selection.index = selectionIndex;
    },
  },
});

export const { moveCursorTo, moveSelectionTo } = selectionSlice.actions;
export default selectionSlice.reducer;
