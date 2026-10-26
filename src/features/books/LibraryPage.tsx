import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookList } from './components/BookList';
import { BorrowedPanel } from './components/BorrowedPanel';
import { CategoryTabs } from './components/CategoryTabs';
import { SearchBar } from './components/SearchBar';
import { dismissWarning } from './booksSlice';

export default function LibraryPage() {
  const dispatch = useAppDispatch();
  const warning = useAppSelector((state) => state.books.warning);

  return (
    <>
      {warning && (
        <div className="banner" role="alert">
          <span>{warning}</span>
          <button type="button" className="link-btn" onClick={() => dispatch(dismissWarning())}>
            Đóng
          </button>
        </div>
      )}

      <BorrowedPanel />

      <div className="toolbar">
        <SearchBar />
        <CategoryTabs />
      </div>

      <BookList />
    </>
  );
}
