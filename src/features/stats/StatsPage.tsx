import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { CATEGORIES } from "../../types/book";
import type { CategoryCounts } from "../../types/book";

export default function StatsPage() {
  const items = useAppSelector((state) => state.books.items);
  const borrowedCount = useAppSelector(
    (state) => state.books.borrowedIds.length,
  );
  const status = useAppSelector((state) => state.books.status);

  const counts = useMemo<CategoryCounts>(() => {
    const result: CategoryCounts = { CNTT: 0, "Kinh tế": 0, "Ngoại ngữ": 0 };
    for (const book of items) result[book.category] += 1;
    return result;
  }, [items]);

  if (status !== "succeeded") {
    return (
      <p className="state" role="status">
        {status === "failed" ? "Chưa có dữ liệu để thống kê." : "Đang tải..."}
      </p>
    );
  }

  return (
    <section aria-label="Thống kê">
      <h2 className="page-title">Thống kê</h2>
      <table className="stats">
        <caption className="visually-hidden">Số đầu sách theo thể loại</caption>
        <thead>
          <tr>
            <th scope="col">Thể loại</th>
            <th scope="col">Số đầu sách</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map((category) => (
            <tr key={category}>
              <th scope="row">{category}</th>
              <td>{counts[category]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Tổng</th>
            <td>{items.length}</td>
          </tr>
        </tfoot>
      </table>
      <p className="stats__borrowed">
        Sách đang mượn: <strong>{borrowedCount}</strong>
      </p>
    </section>
  );
}
