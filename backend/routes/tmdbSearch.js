/// HANDLES THE TMDB API SEARCH

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Query parameter q is required." });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    return res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching data from TMDB", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
