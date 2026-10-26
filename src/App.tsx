import { Suspense, lazy, useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { fetchBooks } from "./features/books/booksSlice";
import LibraryPage from "./features/books/LibraryPage";
import { ThemeToggle } from "./features/theme/ThemeToggle";

const StatsPage = lazy(() => import("./features/stats/StatsPage"));

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const shouldFail =
      new URLSearchParams(window.location.search).get("fail") === "1";
    dispatch(fetchBooks({ shouldFail }));
  }, [dispatch]);

  return (
    <div className="shell">
      <header className="masthead">
        <div>
          <h1 className="masthead__title">Mini Library</h1>
          <p className="masthead__sub">Thư viện khoa</p>
        </div>
        <nav className="masthead__nav" aria-label="Điều hướng chính">
          <NavLink to="/" end>
            Sách
          </NavLink>
          <NavLink to="/stats">Thống kê</NavLink>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        <Suspense
          fallback={
            <p className="state" role="status">
              Đang tải...
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<LibraryPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
