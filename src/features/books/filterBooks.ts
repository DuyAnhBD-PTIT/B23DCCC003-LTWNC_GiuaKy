import { ALL_CATEGORIES } from "../../types/book";
import type { Book, CategoryFilterValue } from "../../types/book";

export function filterBooks(
  books: readonly Book[],
  keyword: string,
  category: CategoryFilterValue,
): Book[] {
  const needle = keyword.trim().toLowerCase();
  return books.filter((book) => {
    const matchesCategory =
      category === ALL_CATEGORIES || book.category === category;
    const matchesKeyword =
      needle === "" ||
      book.title.toLowerCase().includes(needle) ||
      book.author.toLowerCase().includes(needle);
    return matchesCategory && matchesKeyword;
  });
}
