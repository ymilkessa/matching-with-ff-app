import { configureStore } from "@reduxjs/toolkit";
import arrayReducer from "./numberSets/arraySlice";
import gameSizeReducer from "./gameSettings/sizeSlice";
import selectionReducer from "./selectionTracker/selectionSlice";

export const store = configureStore({
  reducer: {
    sets: arrayReducer,
    gameSettings: gameSizeReducer,
    selectionAndCursor: selectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
