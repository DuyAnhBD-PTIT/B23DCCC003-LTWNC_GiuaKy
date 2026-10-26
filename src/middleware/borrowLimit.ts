import type { Middleware } from "@reduxjs/toolkit";
import { borrowBook, borrowLimitReached } from "../features/books/booksSlice";
import type { BooksState } from "../features/books/booksSlice";

export const MAX_BORROWED = 3;

export const borrowLimitMiddleware: Middleware<{}, { books: BooksState }> =
  (api) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const { borrowedIds } = api.getState().books;
      const alreadyBorrowed = borrowedIds.includes(action.payload);
      if (!alreadyBorrowed && borrowedIds.length >= MAX_BORROWED) {
        return api.dispatch(borrowLimitReached(MAX_BORROWED));
      }
    }
    return next(action);
  };
