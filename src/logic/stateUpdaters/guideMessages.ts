import { createSlice } from "@reduxjs/toolkit";

export enum GUIDE_MESSAGE {
  INITIAL_RENDER = 1,
  FIRST_MATCH = 2,
  ERROR_MATCH = 3,
  AUTO_SOLVER_RUNNING = 4,
  NEUTRAL = 0,
}

/**
 * message: The message to display on the StatusBoard
 */
type GuideMessageState = {
  message: GUIDE_MESSAGE;
};

const initialState: GuideMessageState = {
  message: GUIDE_MESSAGE.INITIAL_RENDER,
};

const guideMessageSlice = createSlice({
  name: "guideMessage",
  initialState,
  reducers: {
    showFirstAttemptGuide: (state, action) => {
      state.message = GUIDE_MESSAGE.FIRST_MATCH;
    },
    showInvalidMatchMessage: (state, action) => {
      state.message = GUIDE_MESSAGE.ERROR_MATCH;
    },
    showAutoSolverMessage: (state, action) => {
      state.message = GUIDE_MESSAGE.AUTO_SOLVER_RUNNING;
    },
    showNoGuideMessage: (state, action) => {
      state.message = GUIDE_MESSAGE.NEUTRAL;
    },
  },
});

export const {
  showFirstAttemptGuide,
  showInvalidMatchMessage,
  showAutoSolverMessage,
  showNoGuideMessage,
} = guideMessageSlice.actions;
export default guideMessageSlice.reducer;
