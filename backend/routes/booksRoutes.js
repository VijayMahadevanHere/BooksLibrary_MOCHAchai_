const express = require("express");
const {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
} = require("../controller/booksController");

const router = express.Router(); 



router.route("/").get(getBooks).post(setBook);
router.route("/:id").put(updateBook).delete(deleteBook);



module.exports = router;
