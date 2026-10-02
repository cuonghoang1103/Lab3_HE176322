import { Col, Form, InputGroup, Row } from "react-bootstrap";

function GenreFilter({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
}) {
  return (
    <Row className="g-2">
      <Col sm={6}>
        <InputGroup>
          <InputGroup.Text>Genre:</InputGroup.Text>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <option value="All">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Col>

      <Col sm={6}>
        <InputGroup>
          <InputGroup.Text>Sort by:</InputGroup.Text>
          <Form.Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="high">Rating: High → Low</option>
            <option value="low">Rating: Low → High</option>
          </Form.Select>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default GenreFilter;
