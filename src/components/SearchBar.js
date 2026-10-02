import { useEffect, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  // useRef dùng để tham chiếu tới ô input tìm kiếm
  const inputRef = useRef(null);

  // Khi trang vừa load, tự động đặt con trỏ vào ô tìm kiếm
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Mỗi lần gõ phím, đọc giá trị của input qua ref rồi gửi lên App
  const handleChange = () => {
    onSearch(inputRef.current.value);
  };

  return (
    <InputGroup>
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        ref={inputRef}
        type="text"
        placeholder="Tìm tên phim..."
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default SearchBar;
