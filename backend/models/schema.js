const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  movieTitle: String,
  movieId: Number,
  userId: String,
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
