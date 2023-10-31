import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useLoans } from "./LoanContext";
import "./FrontPage.css";
import { Toast } from "react-bootstrap";

const FrontPage = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loanedMovies, setLoanedMovies] = useLoans();
  const [showSearch, setShowSearch] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      alert("Please enter a movie title to search");
      return;
    }

    try {
      const response = await axios.get(`/api/tmdb/search?q=${searchTerm}`);
      const data = response.data;

      setSearchResults(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  const handleLoan = async (movie) => {
    try {
      await axios.post("/api/movies/loan", {
        movieTitle: movie.title,
        movieId: movie.id,
      });

      setLoanedMovies([...loanedMovies, movie]);
      setShowToast(true);
    } catch (error) {
      console.error("Error loaning the movie:", error);
      alert("Failed to loan the movie. Please try again.");
    }
  };

  const handleReturn = async (movieId) => {
    try {
      await axios.delete(`/api/movies/return/${movieId}`);
      const updatedLoanedMovies = loanedMovies.filter(
        (movie) => movie.id !== movieId
      );
      setLoanedMovies(updatedLoanedMovies);
    } catch (error) {
      console.error("Error returning the movie:", error);
      alert("Failed to mark the movie as returned. Please try again.");
    }
  };

  useEffect(() => {
    const fetchLoanedMovies = async () => {
      try {
        const response = await axios.get("/");
        setLoanedMovies(response.data);
      } catch (error) {
        console.error("Error fetching loaned movies:", error);
      }
    };
    fetchLoanedMovies();
  }, []);

  return (
    <>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000} // The toast will be auto-hidden after 3 seconds
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999, // Ensure the toast appears on top of other elements
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>Movie loaned successfully</Toast.Body>
      </Toast>

      <Container fluid>
        <Row className="mt-4">
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item
                className="clickable-list-item"
                onClick={() => setShowSearch(true)}
              >
                Search Movie
              </ListGroup.Item>
              <ListGroup.Item
                className="clickable-list-item"
                onClick={() => setShowSearch(false)}
              >
                Out on Loan
              </ListGroup.Item>
              <ListGroup.Item
                className="clickable-list-item"
                onClick={onLogout}
              >
                Logout
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {showSearch ? (
              <>
                <Form onSubmit={handleSearch}>
                  <Form.Group>
                    <Form.Label>
                      Type the title of the movie you'd like to loan
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search for a movie"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="btn" variant="primary" type="submit">
                    Search
                  </Button>
                </Form>

                <Row className="mt-4">
                  {searchResults
                    .filter((movie) => movie.poster_path)
                    .map((movie) => (
                      <Col xs={6} md={4} lg={3} key={movie.id}>
                        <Card>
                          <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          />
                          <Card.Body>
                            <Card.Title>
                              {movie.title} (
                              {new Date(movie.release_date).getFullYear()})
                            </Card.Title>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleLoan(movie)}
                            >
                              Loan this movie
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </>
            ) : (
              <Row className="mt-4">
                <h4>Out on Loan</h4>
                {loanedMovies
                  .filter((movie) => movie.poster_path)
                  .map((movie) => (
                    <Col xs={6} md={4} lg={3} key={movie.id}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                        <Card.Body>
                          <Card.Title>
                            {movie.title} (
                            {new Date(movie.release_date).getFullYear()})
                          </Card.Title>
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleReturn(movie.id)}
                          >
                            Mark as Returned
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FrontPage;
