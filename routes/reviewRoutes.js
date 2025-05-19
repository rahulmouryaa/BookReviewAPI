const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id/reviews", authMiddleware, addReview); // Add review to book with id = :id
router.put("/:id", authMiddleware, updateReview); // Update review by review id
router.delete("/:id", authMiddleware, deleteReview); // Delete review by review id

module.exports = router;
