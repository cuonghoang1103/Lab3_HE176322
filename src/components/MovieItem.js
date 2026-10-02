import { Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function MovieItem({ movie, isFavorite, onToggleFavorite, onViewDetail }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <Card.Title className="mb-2">{movie.title}</Card.Title>
          <div>
            <Badge bg="secondary" className="me-2">
              {movie.genre}
            </Badge>
            <span className="me-2">{movie.year}</span>
            <span className="fw-semibold">Rating: {movie.rating}</span>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant={isFavorite ? "warning" : "outline-warning"}
            onClick={() => onToggleFavorite(movie.id)}
          >
            {isFavorite ? (
              <>
                <FaStar /> Unfavorite
              </>
            ) : (
              <>
                <CiStar /> Favorite
              </>
            )}
          </Button>

          <Button variant="primary" onClick={() => onViewDetail(movie)}>
            <FaInfoCircle /> View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieItem;
