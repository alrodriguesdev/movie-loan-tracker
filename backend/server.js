const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

/// MIDDLEWARE

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.get("/", (req, res) => {
  res.send("Server working!");
});

/// IMPORTING ROUTES

const movieRoutes = require("./routes/movies");
const tmdbSearch = require("./routes/tmdbSearch");
const userRoute = require("./routes/userRoute");

/// CONNECTING TO MONGODB

mongoose
  .connect("mongodb://localhost:27017/todomovie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

/// ROUTES

app.use("/api/movies", movieRoutes);
app.use("/api/tmdb", tmdbSearch);
app.use("/api/users", userRoute);
