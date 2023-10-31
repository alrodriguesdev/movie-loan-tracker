import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useLoans } from "./LoanContext";
import "./SearchMovie.css";

const SearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loanedMovies, setLoanedMovies] = useLoans();

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
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  const handleLoan = (movie) => {
    setLoanedMovies([...loanedMovies, movie]);
  };

  return (
    <>
      <Row className="mt-4">
        {searchResults
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Col md={2} key={movie.id}>
              <Card>
                <Card.Img
                  className="movie-image"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </Card.Title>
                  <Button variant="primary" onClick={() => handleLoan(movie)}>
                    Loan this movie
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default SearchMovie2;
