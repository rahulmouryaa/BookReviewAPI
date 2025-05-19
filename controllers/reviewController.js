// controllers/reviewController.js

const Book = require("../models/Book");
const Review = require("../models/Review");
const mongoose = require("mongoose");

// ➡️ Add a Review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user.id;

    // Check if the user has already reviewed the book
    const existingReview = await Review.findOne({ book: bookId, user: userId });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book." });
    }

    const review = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    await review.save();

    // Update the book with the review
    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: review._id },
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Update a Review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id;

    // Check if the review belongs to the user
    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to update it.",
      });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➡️ Delete a Review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    // Check if the review belongs to the user
    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to delete it.",
      });
    }

    // Remove the review from the book
    await Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: review._id },
    });

    await review.deleteOne(); // <-- fixed here

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
