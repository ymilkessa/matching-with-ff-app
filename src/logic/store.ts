import { configureStore } from "@reduxjs/toolkit";
import arrayReducer from "./stateUpdaters/arraySlice";
import gameSizeReducer from "./stateUpdaters/gameSizeSlice";
import markingsReducer from "./stateUpdaters/markingsSlice";
import matchingsReducer from "./stateUpdaters/matchingsSlice";
import selectionReducer from "./stateUpdaters/selectionSlice";

export const store = configureStore({
  reducer: {
    sets: arrayReducer,
    gameSettings: gameSizeReducer,
    markings: markingsReducer,
    matchings: matchingsReducer,
    virtualSelection: selectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
