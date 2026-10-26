import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'light' ? 'tối' : 'sáng';

  return (
    <button type="button" className="btn btn--ghost" onClick={toggleTheme} aria-label={`Chuyển sang giao diện ${next}`}>
      {theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
    </button>
  );
}
