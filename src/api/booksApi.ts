import { seedBooks } from "../data/seedBooks";
import type { ApiResult } from "../types/api";
import type { Book } from "../types/book";

export interface FetchBooksOptions {
  shouldFail?: boolean;
  delayMs?: number;
}

export const FETCH_ERROR_MESSAGE =
  "Không thể tải danh sách sách. Vui lòng thử lại.";

export function fetchBooks(
  options: FetchBooksOptions = {},
): Promise<ApiResult<Book[]>> {
  const { shouldFail = false, delayMs = 500 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: FETCH_ERROR_MESSAGE });
        return;
      }
      resolve({ ok: true, data: seedBooks.map((book) => ({ ...book })) });
    }, delayMs);
  });
}
