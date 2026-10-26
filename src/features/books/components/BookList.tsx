import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useFilterStore } from '../../filters/useFilterStore';
import { borrowBook, fetchBooks, returnBook } from '../booksSlice';
import { filterBooks } from '../filterBooks';
import { BookItem } from './BookItem';

export function BookList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.books.items);
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds);
  const status = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  const keyword = useFilterStore((state) => state.keyword);
  const category = useFilterStore((state) => state.category);

  const visibleBooks = useMemo(() => filterBooks(items, keyword, category), [items, keyword, category]);
  const borrowedSet = useMemo(() => new Set(borrowedIds), [borrowedIds]);

  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch]);
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);
  const handleRetry = useCallback(() => dispatch(fetchBooks()), [dispatch]);

  if (status === 'idle' || status === 'loading') {
    return (
      <p className="state" role="status">
        Đang tải...
      </p>
    );
  }

  if (status === 'failed') {
    return (
      <div className="state state--error" role="alert">
        <p>{error}</p>
        <button type="button" className="btn" onClick={handleRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  if (visibleBooks.length === 0) {
    return <p className="state">Không tìm thấy sách phù hợp.</p>;
  }

  return (
    <>
      <p className="result-count">{visibleBooks.length} đầu sách</p>
      <div className="grid">
        {visibleBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            isBorrowed={borrowedSet.has(book.id)}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        ))}
      </div>
    </>
  );
}
