import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

function renderApp() {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

test('hiển thị toàn bộ danh sách phim', () => {
  renderApp();
  expect(screen.getByText('Mini Movie Manager')).toBeInTheDocument();
  expect(screen.getByText('Interstellar')).toBeInTheDocument();
  expect(screen.getByText(/Đang hiển thị: 6/)).toBeInTheDocument();
});

test('tìm kiếm theo tên không phân biệt hoa thường', () => {
  renderApp();
  fireEvent.change(screen.getByPlaceholderText('Tìm tên phim...'), {
    target: { value: 'DARK' },
  });
  expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  expect(screen.queryByText('Interstellar')).not.toBeInTheDocument();
  expect(screen.getByText(/Đang hiển thị: 1/)).toBeInTheDocument();
});

test('lọc theo thể loại và chọn lại All Genres', () => {
  renderApp();
  const genreSelect = screen.getByDisplayValue('All Genres');

  fireEvent.change(genreSelect, { target: { value: 'Action' } });
  expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  expect(screen.getByText(/Đang hiển thị: 1/)).toBeInTheDocument();

  fireEvent.change(genreSelect, { target: { value: 'All' } });
  expect(screen.getByText(/Đang hiển thị: 6/)).toBeInTheDocument();
});

test('lọc thể loại hoạt động cùng với tìm kiếm', () => {
  renderApp();
  fireEvent.change(screen.getByDisplayValue('All Genres'), {
    target: { value: 'Animation' },
  });
  fireEvent.change(screen.getByPlaceholderText('Tìm tên phim...'), {
    target: { value: 'dark' },
  });
  expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
  expect(screen.getByText('Không tìm thấy phim nào.')).toBeInTheDocument();
});

function getDisplayedTitles() {
  return screen.getAllByText((_, el) => el.classList.contains('card-title'))
    .map((el) => el.textContent);
}

test('sắp xếp theo rating cao -> thấp, thấp -> cao và Default', () => {
  renderApp();
  const sortSelect = screen.getByDisplayValue('Default');

  fireEvent.change(sortSelect, { target: { value: 'high' } });
  expect(getDisplayedTitles()[0]).toBe('The Dark Knight');

  fireEvent.change(sortSelect, { target: { value: 'low' } });
  expect(getDisplayedTitles()[0]).toBe('The Grand Budapest Hotel');

  fireEvent.change(sortSelect, { target: { value: 'default' } });
  expect(getDisplayedTitles()[0]).toBe('Interstellar');
});

test('sắp xếp hoạt động cùng tìm kiếm và lọc thể loại', () => {
  renderApp();
  fireEvent.change(screen.getByPlaceholderText('Tìm tên phim...'), {
    target: { value: 'the' },
  });
  fireEvent.change(screen.getByDisplayValue('Default'), {
    target: { value: 'low' },
  });
  expect(getDisplayedTitles()).toEqual([
    'The Grand Budapest Hotel',
    'The Dark Knight',
  ]);

  fireEvent.change(screen.getByDisplayValue('All Genres'), {
    target: { value: 'Action' },
  });
  expect(getDisplayedTitles()).toEqual(['The Dark Knight']);
});

test('thêm và bỏ phim yêu thích, số lượng yêu thích tự cập nhật', () => {
  renderApp();
  expect(screen.getByText(/Yêu thích: 0/)).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button', { name: /^Favorite$/ })[0]);
  expect(screen.getByText(/Yêu thích: 1/)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Unfavorite/ })).toHaveLength(1);

  fireEvent.click(screen.getAllByRole('button', { name: /^Favorite$/ })[0]);
  expect(screen.getByText(/Yêu thích: 2/)).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button', { name: /Unfavorite/ })[0]);
  expect(screen.getByText(/Yêu thích: 1/)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Unfavorite/ })).toHaveLength(1);
});

test('xem chi tiết phim, mỗi lần chỉ 1 phim và đóng được', () => {
  renderApp();
  const detailButtons = screen.getAllByRole('button', { name: /View Details/ });

  fireEvent.click(detailButtons[0]);
  expect(screen.getByText('Movie details')).toBeInTheDocument();
  expect(screen.getByText('169 minutes')).toBeInTheDocument();

  const closeButtons = screen.getAllByRole('button', { name: 'Close' });
  fireEvent.click(closeButtons[closeButtons.length - 1]);
  expect(screen.queryByText('Movie details')).not.toBeInTheDocument();

  fireEvent.click(detailButtons[1]);
  expect(screen.getAllByText('Movie details')).toHaveLength(1);
  expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();
  expect(screen.queryByText('169 minutes')).not.toBeInTheDocument();
});
