import { filterBooks } from './filterBooks';
import type { Book } from '../../types/book';

const books: Book[] = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 1, total: 1 },
  { id: '2', title: 'Good to Great', author: 'Jim Collins', category: 'Kinh tế', year: 2001, available: 1, total: 1 },
  { id: '3', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, available: 1, total: 1 },
];

describe('filterBooks', () => {
  it('tìm theo tên không phân biệt hoa thường', () => {
    expect(filterBooks(books, 'CLEAN', 'Tất cả').map((b) => b.id)).toEqual(['1']);
  });

  it('tìm theo tác giả', () => {
    expect(filterBooks(books, 'murphy', 'Tất cả').map((b) => b.id)).toEqual(['3']);
  });

  it('lọc theo thể loại và kết hợp với từ khoá', () => {
    expect(filterBooks(books, '', 'Kinh tế').map((b) => b.id)).toEqual(['2']);
    expect(filterBooks(books, 'clean', 'Kinh tế')).toEqual([]);
  });
});
