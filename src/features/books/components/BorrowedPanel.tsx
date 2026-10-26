import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MAX_BORROWED } from '../../../middleware/borrowLimit';
import type { BookSummary } from '../../../types/book';
import { returnBook } from '../booksSlice';

export function BorrowedPanel() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.books.items);
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds);

  const borrowed = useMemo<BookSummary[]>(() => {
    const set = new Set(borrowedIds);
    return items.filter((book) => set.has(book.id)).map(({ id, title }) => ({ id, title }));
  }, [items, borrowedIds]);

  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);

  return (
    <section className="borrowed" aria-label="Sách đang mượn">
      <h2 className="borrowed__title">
        Đang mượn <span className="borrowed__count">{borrowed.length}/{MAX_BORROWED}</span>
      </h2>
      {borrowed.length === 0 ? (
        <p className="borrowed__empty">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <ul className="borrowed__list">
          {borrowed.map((book) => (
            <li key={book.id}>
              <span>{book.title}</span>
              <button type="button" className="link-btn" onClick={() => handleReturn(book.id)} aria-label={`Trả sách ${book.title}`}>
                Trả
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
