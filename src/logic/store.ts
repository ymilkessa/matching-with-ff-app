import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import arrayReducer from "./stateUpdaters/arraySlice";
import gameSizeReducer from "./stateUpdaters/gameSizeSlice";
import markingsReducer from "./stateUpdaters/markingsSlice";
import matchingsReducer from "./stateUpdaters/matchingsSlice";
import selectionReducer from "./stateUpdaters/selectionSlice";
import autoSolverStatusReducer from "./stateUpdaters/autoSolverStatus";
import guideMessageReducer from "./stateUpdaters/guideMessages";

const rootReducer = combineReducers({
  sets: arrayReducer,
  gameSettings: gameSizeReducer,
  markings: markingsReducer,
  matchings: matchingsReducer,
  virtualSelection: selectionReducer,
  autoSolverStatus: autoSolverStatusReducer,
  guideMessage: guideMessageReducer,
});

export const store = configureStore({
  // (yofti): This also works if you just place the argument object
  // to the combineReducers call.
  reducer: rootReducer,
});

/**
 * Creates a store initially configured to preLoadedState.
 * Used for testing
 */
export const setupCustomStore = (
  customPreLoadedState: PreloadedState<RootState>
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: customPreLoadedState,
  });
};

export type AppStore = ReturnType<typeof setupCustomStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
