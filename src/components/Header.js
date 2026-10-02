import { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FaFilm, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar className="bg-body-tertiary border-bottom mb-4">
      <Container>
        <Navbar.Brand className="fw-bold">
          <FaFilm className="me-2" />
          Mini Movie Manager
        </Navbar.Brand>

        <Button
          variant={theme === "light" ? "dark" : "light"}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <>
              <FaMoon /> Dark
            </>
          ) : (
            <>
              <FaSun /> Light
            </>
          )}
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
