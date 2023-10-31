const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

router.get("/checksession", (req, res) => {
  console.log("Check Session route hit.");
  if (req.cookies.sessionId) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

router.post("/logout", (req, res) => {
  if (req.cookies.sessionId) {
    // Clear the sessionId cookie
    res.clearCookie("sessionId");

    // TODO: Remove the sessionId from server-side storage if applicable

    res.status(200).send({ message: "User logged out successfully" });
  } else {
    res.status(400).send({ message: "No session to logout from" });
  }
});

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 5, max: 20 })
      .withMessage("Username must be between 5 to 20 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // CHECK IF USER ALREADY EXISTS
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // CREATE A NEW USER
      user = new User(req.body);

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      // Send success response
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res
        .status(400)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
);

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    /// CHECK IF USER EXISTS
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const sessionId = uuid.v4();

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false, // Set to true if you are using HTTPS
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
