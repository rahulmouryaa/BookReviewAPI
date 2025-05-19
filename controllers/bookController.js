// controllers/bookController.js
const Book = require("../models/Book");
const Review = require("../models/Review");

// ➡️ Add a New Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Get All Books (with pagination and filter)
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Get Book Details by ID (with reviews and average rating)
exports.getBookById = async (req, res) => {
  try {
    console.log("Book ID from Params:", req.params.id); // Debugging log

    // 🔍 Find the book by ID and populate the reviews
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 🔍 Fetch all reviews for the book
    const reviews = await Review.find({ book: req.params.id });
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = reviews.length
      ? (totalRatings / reviews.length).toFixed(2)
      : 0;

    res.status(200).json({ book, averageRating, reviews });
  } catch (error) {
    console.error("Error in getBookById:", error.message); // Debugging log
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Search Books by title or author (partial, case-insensitive)
exports.searchBooks = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    // Create a case-insensitive regex for partial matching
    const searchRegex = new RegExp(q, "i");

    // Search books where title or author matches the query
    const books = await Book.find({
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
      ],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
