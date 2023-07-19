
//@desc   Get books
//@route  GET /api/books
//@access Private

const getBooks = (req, res) => {
  res.status(200).json({ message: "get books" })
};

//@desc   Set book
//@route  POST /api/book
//@access Private

const setBook = (req, res) => {
 if(!req.body.text){
    res.status(400)
    throw new Error("please add valid inputs.")
 }
};

//@desc   Set book 
//@route  PUT /api/book/:id
//@access Private

const updateBook = (req, res) => {
  res.status(200).json({ message: `Update book ${req.params.id}` });
};

//@desc   Set book
//@route  DELETE /api/book/:id
//@access Private

const deleteBook = (req, res) => {
  res.status(200).json({ message: `Delete book ${req.params.id}` });
};


module.exports = {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
};
