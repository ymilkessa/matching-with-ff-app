import { configureStore } from "@reduxjs/toolkit";
import arrayReducer from "./gameLogic/arraySlice";
import gameSizeReducer from "./gameSettings/sizeSlice";

export const store = configureStore({
  reducer: {
    sets: arrayReducer,
    gameSettings: gameSizeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
