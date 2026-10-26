import booksReducer, {
  borrowBook,
  borrowLimitReached,
  dismissWarning,
  fetchBooks,
  initialState,
  returnBook,
} from './booksSlice';
import type { BooksState } from './booksSlice';
import type { Book } from '../../types/book';

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  available: 2,
  total: 3,
  ...overrides,
});

const stateWith = (overrides: Partial<BooksState> = {}): BooksState => ({
  ...initialState,
  status: 'succeeded',
  items: [makeBook()],
  ...overrides,
});

describe('booksSlice reducer', () => {
  it('đặt status = loading khi fetchBooks.pending', () => {
    const state = booksReducer(initialState, fetchBooks.pending('req-1', undefined));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('lưu danh sách sách và status = succeeded khi fetchBooks.fulfilled', () => {
    const books = [makeBook(), makeBook({ id: 'b2', title: 'Refactoring' })];
    const state = booksReducer(initialState, fetchBooks.fulfilled(books, 'req-1', undefined));
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(books);
  });

  it('lưu thông báo lỗi và status = failed khi fetchBooks.rejected', () => {
    const action = fetchBooks.rejected(null, 'req-1', undefined, 'Không thể tải');
    const state = booksReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Không thể tải');
  });

  it('borrowBook giảm số bản còn lại 1 và ghi nhận sách đang mượn', () => {
    const state = booksReducer(stateWith(), borrowBook('b1'));
    expect(state.items[0].available).toBe(1);
    expect(state.borrowedIds).toEqual(['b1']);
  });

  it('borrowBook không làm gì khi sách đã hết bản', () => {
    const state = booksReducer(stateWith({ items: [makeBook({ available: 0 })] }), borrowBook('b1'));
    expect(state.items[0].available).toBe(0);
    expect(state.borrowedIds).toEqual([]);
  });

  it('borrowBook không mượn trùng một cuốn hai lần', () => {
    const once = booksReducer(stateWith(), borrowBook('b1'));
    const twice = booksReducer(once, borrowBook('b1'));
    expect(twice.items[0].available).toBe(1);
    expect(twice.borrowedIds).toEqual(['b1']);
  });

  it('returnBook tăng số bản còn lại 1 và bỏ sách khỏi danh sách đang mượn', () => {
    const borrowed = stateWith({ items: [makeBook({ available: 1 })], borrowedIds: ['b1'] });
    const state = booksReducer(borrowed, returnBook('b1'));
    expect(state.items[0].available).toBe(2);
    expect(state.borrowedIds).toEqual([]);
  });

  it('returnBook bỏ qua sách chưa mượn', () => {
    const state = booksReducer(stateWith(), returnBook('b1'));
    expect(state.items[0].available).toBe(2);
  });

  it('borrowLimitReached đặt cảnh báo, dismissWarning xoá cảnh báo', () => {
    const warned = booksReducer(stateWith(), borrowLimitReached(3));
    expect(warned.warning).toContain('3');
    expect(booksReducer(warned, dismissWarning()).warning).toBeNull();
  });
});
