import { ALL_CATEGORIES, CATEGORIES } from '../../../types/book';
import type { CategoryFilterValue } from '../../../types/book';
import { useFilterStore } from '../../filters/useFilterStore';

const OPTIONS: readonly CategoryFilterValue[] = [ALL_CATEGORIES, ...CATEGORIES];

export function CategoryTabs() {
  const category = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);

  return (
    <div className="tabs" role="group" aria-label="Lọc theo thể loại">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`tab${option === category ? ' tab--active' : ''}`}
          aria-pressed={option === category}
          onClick={() => setCategory(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
