import { createSlice } from "@reduxjs/toolkit";

export interface GameSize {
  setASize: number;
  setBSize: number;
}

const initialSize: GameSize = {
  setASize: 5,
  setBSize: 8,
};

export const gameSizeSlice = createSlice({
  name: `gameSize`,
  initialState: initialSize,
  reducers: {
    changeNumberOfPairs: (state, action) => {
      const { setASize, setBSize } = action.payload as GameSize;
      state.setASize = setASize;
      state.setBSize = setBSize;
    },
  },
});

export const { changeNumberOfPairs } = gameSizeSlice.actions;
export default gameSizeSlice.reducer;
