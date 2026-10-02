import { Alert } from "react-bootstrap";
import MovieItem from "./MovieItem";

function MovieList({ movies, favorites, onToggleFavorite, onViewDetail }) {
  if (movies.length === 0) {
    return <Alert variant="warning">Không tìm thấy phim nào.</Alert>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}

export default MovieList;
