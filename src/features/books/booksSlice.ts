import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks as fetchBooksApi } from "../../api/booksApi";
import { isSuccess } from "../../types/api";
import type { Book } from "../../types/book";

export type FetchStatus = "idle" | "loading" | "succeeded" | "failed";

export interface BooksState {
  items: Book[];
  borrowedIds: string[];
  status: FetchStatus;
  error: string | null;
  warning: string | null;
}

export const initialState: BooksState = {
  items: [],
  borrowedIds: [],
  status: "idle",
  error: null,
  warning: null,
};

export interface FetchBooksArg {
  shouldFail?: boolean;
}

export const fetchBooks = createAsyncThunk<
  Book[],
  FetchBooksArg | undefined,
  { rejectValue: string; state: { books: BooksState } }
>(
  "books/fetchBooks",
  async (arg, { rejectWithValue }) => {
    const result = await fetchBooksApi({ shouldFail: arg?.shouldFail });
    return isSuccess(result) ? result.data : rejectWithValue(result.error);
  },
  {
    condition: (_arg, { getState }) => {
      const { status } = getState().books;
      return status === "idle" || status === "failed";
    },
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (!book || book.available <= 0 || state.borrowedIds.includes(book.id))
        return;
      book.available -= 1;
      state.borrowedIds.push(book.id);
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      const index = state.borrowedIds.indexOf(action.payload);
      if (index === -1) return;
      const book = state.items.find((item) => item.id === action.payload);
      if (book) book.available = Math.min(book.available + 1, book.total);
      state.borrowedIds.splice(index, 1);
    },
    borrowLimitReached(state, action: PayloadAction<number>) {
      state.warning = `Bạn chỉ được mượn tối đa ${action.payload} cuốn cùng lúc. Hãy trả bớt sách trước khi mượn thêm.`;
    },
    dismissWarning(state) {
      state.warning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ??
          action.error.message ??
          "Đã xảy ra lỗi không xác định.";
      });
  },
});

export const { borrowBook, returnBook, borrowLimitReached, dismissWarning } =
  booksSlice.actions;
export default booksSlice.reducer;
