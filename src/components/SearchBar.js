import { useEffect, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
