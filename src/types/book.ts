export const CATEGORIES = ["CNTT", "Kinh tế", "Ngoại ngữ"] as const;
export type Category = (typeof CATEGORIES)[number];

export const ALL_CATEGORIES = "Tất cả" as const;
export type CategoryFilterValue = typeof ALL_CATEGORIES | Category;

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
  total: number;
}

export type BookSummary = Pick<Book, "id" | "title">;
export type BookSearchFields = Pick<Book, "title" | "author" | "category">;

export type CategoryCounts = Record<Category, number>;

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
