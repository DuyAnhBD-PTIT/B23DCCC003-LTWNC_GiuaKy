import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import { borrowLimitMiddleware } from "../middleware/borrowLimit";

const rootReducer = combineReducers({ books: booksReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(borrowLimitMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
