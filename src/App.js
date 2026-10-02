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
  const [favorites, setFavorites] = useState([]); // mảng chứa id các phim yêu thích, ví dụ [1, 3]
  // Phim đang xem chi tiết: null = đang đóng, có giá trị = đang mở.
  // Chỉ lưu 1 phim nên mỗi lần chỉ hiển thị chi tiết của 1 phim.
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Lấy danh sách thể loại (không trùng lặp) từ dữ liệu phim, sắp xếp A - Z
  // => Action, Animation, Comedy, Drama, Romance, Sci-Fi
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();

  // Bấm "Favorite" thì thêm id vào mảng, bấm "Unfavorite" thì xoá id khỏi mảng
  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // useMemo: chỉ tính lại danh sách phim khi keyword, selectedGenre hoặc sortBy thay đổi
  // (bấm Yêu thích hay mở Chi tiết sẽ không phải lọc / sắp xếp lại)
  const displayedMovies = useMemo(() => {
    // 1. Tìm theo tên phim (không phân biệt chữ hoa / chữ thường)
    let result = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.trim().toLowerCase())
    );

    // 2. Lọc theo thể loại
    if (selectedGenre !== "All") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // 3. Sắp xếp theo rating
    // (filter đã tạo ra mảng mới nên sort không làm thay đổi mảng movies gốc)
    if (sortBy === "high") {
      result.sort((a, b) => b.rating - a.rating); // cao -> thấp
    } else if (sortBy === "low") {
      result.sort((a, b) => a.rating - b.rating); // thấp -> cao
    }

    return result;
  }, [keyword, selectedGenre, sortBy]);

  return (
    <div className="min-vh-100">
      <Header />

      <Container>
        {/* Hàng 1: ô tìm tên phim */}
        <div className="mb-2">
          <SearchBar onSearch={setKeyword} />
        </div>

        {/* Hàng 2: lọc thể loại và sắp xếp, nằm dưới ô tìm kiếm */}
        <div className="mb-4">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Thống kê */}
        <p className="fw-semibold">
          Tổng: {movies.length} | Yêu thích: {favorites.length} | Đang hiển
          thị: {displayedMovies.length}
        </p>

        {/* Danh sách phim */}
        <MovieList
          movies={displayedMovies}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewDetail={setSelectedMovie}
        />
      </Container>

      {/* Popup chi tiết phim */}
      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;
