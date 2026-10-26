import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useFilterStore } from "../../filters/useFilterStore";

export function SearchBar() {
  const setKeyword = useFilterStore((state) => state.setKeyword);
  const [text, setText] = useState(() => useFilterStore.getState().keyword);

  const debouncedText = useDebounce(text, 300);

  useEffect(() => {
    setKeyword(debouncedText);
  }, [debouncedText, setKeyword]);

  return (
    <label className="search">
      <span className="visually-hidden">Tìm sách theo tên hoặc tác giả</span>
      <input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Tìm theo tên sách hoặc tác giả"
      />
    </label>
  );
}
