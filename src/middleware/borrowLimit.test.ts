import { makeStore } from '../app/store';
import { initialState, borrowBook, returnBook } from '../features/books/booksSlice';
import type { Book } from '../types/book';
import { MAX_BORROWED } from './borrowLimit';

const books: Book[] = ['b1', 'b2', 'b3', 'b4'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2020,
  available: 2,
  total: 2,
}));

const createStore = () =>
  makeStore({ books: { ...initialState, status: 'succeeded', items: books.map((b) => ({ ...b })) } });

describe('borrowLimitMiddleware', () => {
  it('cho mượn khi chưa đủ giới hạn', () => {
    const store = createStore();
    store.dispatch(borrowBook('b1'));
    expect(store.getState().books.borrowedIds).toEqual(['b1']);
  });

  it(`chặn cuốn thứ ${MAX_BORROWED + 1} và đặt cảnh báo, số bản không đổi`, () => {
    const store = createStore();
    ['b1', 'b2', 'b3', 'b4'].forEach((id) => store.dispatch(borrowBook(id)));

    const { borrowedIds, items, warning } = store.getState().books;
    expect(borrowedIds).toEqual(['b1', 'b2', 'b3']);
    expect(items.find((b) => b.id === 'b4')?.available).toBe(2);
    expect(warning).not.toBeNull();
  });

  it('cho mượn lại sau khi trả bớt một cuốn', () => {
    const store = createStore();
    ['b1', 'b2', 'b3'].forEach((id) => store.dispatch(borrowBook(id)));
    store.dispatch(returnBook('b1'));
    store.dispatch(borrowBook('b4'));

    expect(store.getState().books.borrowedIds).toEqual(['b2', 'b3', 'b4']);
  });
});
