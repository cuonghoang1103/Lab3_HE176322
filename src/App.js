import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import { movies } from "./datas/movies";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [keyword, setKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();

  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const displayedMovies = useMemo(() => {
    let result = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.trim().toLowerCase())
    );

    if (selectedGenre !== "All") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "low") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [keyword, selectedGenre, sortBy]);

  return (
    <div className="min-vh-100">
      <Header />

      <Container>
        <div className="mb-2">
          <SearchBar onSearch={setKeyword} />
        </div>

        <div className="mb-4">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <p className="fw-semibold">
          Tổng: {movies.length} | Yêu thích: {favorites.length} | Đang hiển
          thị: {displayedMovies.length}
        </p>

        <MovieList
          movies={displayedMovies}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewDetail={setSelectedMovie}
        />
      </Container>

      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;
