import { create } from 'zustand';
import { ALL_CATEGORIES } from '../../types/book';
import type { CategoryFilterValue } from '../../types/book';

interface FilterState {
  keyword: string;
  category: CategoryFilterValue;
  setKeyword: (keyword: string) => void;
  setCategory: (category: CategoryFilterValue) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  keyword: '',
  category: ALL_CATEGORIES,
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
  reset: () => set({ keyword: '', category: ALL_CATEGORIES }),
}));
