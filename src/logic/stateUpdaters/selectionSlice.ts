import { createSlice } from "@reduxjs/toolkit";
import { BoxLocation } from "../../components/NumberBox/types";

export interface VirtualSelection {
  selection: BoxLocation | null;
  previousSelection: BoxLocation | null;
  selectionTime: number;
}

const initialState: VirtualSelection = {
  selection: null,
  previousSelection: null,
  selectionTime: 0,
};

export const selectionSlice = createSlice({
  name: "selectionAndCursor",
  initialState,
  reducers: {
    setNewVirtualSelection: (state, action) => {
      const newSelection = action.payload as BoxLocation;
      state.previousSelection = state.selection;
      state.selection = { ...newSelection };
      state.selectionTime = new Date().getTime();
    },
  },
});

export const { setNewVirtualSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
