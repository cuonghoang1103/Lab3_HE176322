import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/userLocalStorage";

// Bước 1: Tạo context để chia sẻ theme cho toàn bộ ứng dụng
export const ThemeContext = createContext();

// Bước 2: Tạo Provider bọc ngoài App, mọi component bên trong đều dùng được theme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Bootstrap 5.3 tự đổi màu sáng/tối dựa vào thuộc tính data-bs-theme trên thẻ <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
