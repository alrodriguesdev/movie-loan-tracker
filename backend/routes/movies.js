const express = require("express");
const router = express.Router();

/// IMPORTING SCHEMA FOR DB OPERATIONS

const Movie = require("../models/schema");

/// POST ROUTE TO LOAN A NEW MOVIE

router.post("/loan", async (req, res) => {
  const newMovie = new Movie({
    movieTitle: req.body.movieTitle,
    movieId: req.body.movieId,
    userId: req.userId,
  });
  try {
    await newMovie.save();
    res.status(201).send(newMovie);
  } catch (err) {
    res.status(400).send("Error loaning the movie");
  }
});

/// DELETE ROUTE TO MARK A MOVIE AS RETURNED

router.delete("/return/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findOneAndRemove({ movieId: movieId });
    if (!movie) {
      return res.status(400).send("Movie not found");
    }
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send("Error returning the movie");
  }
});

/// SEE ALL LOANS IN THE DATABASE

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    console.log("Movies fetched:", movies);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
