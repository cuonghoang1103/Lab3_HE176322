import { Modal, Button, Table } from "react-bootstrap";

function MovieDetail({ movie, onClose }) {
  // Chưa chọn phim nào thì không hiển thị gì
  if (!movie) {
    return null;
  }

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Movie details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table borderless size="sm">
          <tbody>
            <tr>
              <th>Title:</th>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <th>Genre:</th>
              <td>{movie.genre}</td>
            </tr>
            <tr>
              <th>Year:</th>
              <td>{movie.year}</td>
            </tr>
            <tr>
              <th>Rating:</th>
              <td>{movie.rating}</td>
            </tr>
            <tr>
              <th>Director:</th>
              <td>{movie.director}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{movie.duration} minutes</td>
            </tr>
          </tbody>
        </Table>

        <h6>Description:</h6>
        <p className="mb-0">{movie.description}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetail;
