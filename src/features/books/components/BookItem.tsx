import { memo } from "react";
import type { Book } from "../../../types/book";

export interface BookItemProps {
  book: Readonly<Book>;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

function BookItemComponent({
  book,
  isBorrowed,
  onBorrow,
  onReturn,
}: BookItemProps) {
  const soldOut = book.available === 0;

  return (
    <article
      className={`card${isBorrowed ? " card--borrowed" : ""}`}
      aria-label={book.title}
    >
      <header className="card__head">
        <span className="card__call">{book.id.toUpperCase()}</span>
        <span className="card__category">{book.category}</span>
      </header>

      <h3 className="card__title">{book.title}</h3>
      <p className="card__author">{book.author}</p>

      <dl className="card__meta">
        <div>
          <dt>Năm xuất bản</dt>
          <dd>{book.year}</dd>
        </div>
        <div>
          <dt>Còn lại</dt>
          <dd className={soldOut ? "is-empty" : undefined}>{book.available}</dd>
        </div>
      </dl>

      {isBorrowed && <span className="card__stamp">Đang mượn</span>}

      <footer className="card__foot">
        {isBorrowed ? (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onReturn(book.id)}
          >
            Trả
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            disabled={soldOut}
            onClick={() => onBorrow(book.id)}
          >
            Mượn
          </button>
        )}
        {soldOut && !isBorrowed && (
          <span className="card__note">Đã hết bản</span>
        )}
      </footer>
    </article>
  );
}

export const BookItem = memo(BookItemComponent);
