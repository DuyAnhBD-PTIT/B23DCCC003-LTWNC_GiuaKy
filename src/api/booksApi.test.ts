import { isFailure, isSuccess } from '../types/api';
import { fetchBooks } from './booksApi';

describe('booksApi.fetchBooks', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('trả { ok: true, data } sau 500ms', async () => {
    const promise = fetchBooks();
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) expect(result.data.length).toBeGreaterThan(0);
  });

  it('trả { ok: false, error } khi giả lập lỗi', async () => {
    const promise = fetchBooks({ shouldFail: true });
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) expect(result.error).toEqual(expect.any(String));
  });
});
