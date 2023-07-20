const express = require("express");
const {
  getBooks,
  publishBook,
  updateBook,
  deleteBook,
  getBook,
} = require("../controller/booksController");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").get(protect, getBooks).post(protect, publishBook);
router
  .route("/:id")
  .get(protect, getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
