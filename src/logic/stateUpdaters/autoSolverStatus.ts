import { createSlice } from "@reduxjs/toolkit";

type AutoSolverStatus = {
  value: boolean;
};
const initialState: AutoSolverStatus = { value: false };

export const autoSolverStatusSlice = createSlice({
  name: "autoSolverStatus",
  initialState,
  reducers: {
    changeAutoSolverStatus: (state, action) => {
      state.value = !state.value;
    },
    turnOnAutoSolver: (state, action) => {
      if (!state.value) {
        state.value = true;
      }
    },
    turnOffAutoSolver: (state, action) => {
      if (state.value) {
        state.value = false;
      }
    },
  },
});

export const { changeAutoSolverStatus, turnOnAutoSolver, turnOffAutoSolver } =
  autoSolverStatusSlice.actions;
export default autoSolverStatusSlice.reducer;
