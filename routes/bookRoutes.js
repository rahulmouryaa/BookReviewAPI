const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  searchBooks, // Import this function from controller
} = require("../controllers/bookController");

// Routes
router.post("/", addBook); // Add new book
router.get("/search", searchBooks); // Search books - keep before :id
router.get("/", getAllBooks); // Get all books
router.get("/:id", getBookById); // Get book by ID

module.exports = router;
