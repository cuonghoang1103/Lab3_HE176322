import { useEffect, useState } from "react";

// Custom hook: giống useState nhưng giá trị được lưu vào localStorage,
// nên F5 (tải lại trang) vẫn không bị mất dữ liệu
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // Mỗi khi value thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
