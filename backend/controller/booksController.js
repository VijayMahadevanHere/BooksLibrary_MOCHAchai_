const bookSchema = require("../validation/bookSchema.js");
const books = []; //books collection

//@desc   Get books
//@route  GET /api/books
//@access Private

const getBooks = (req, res) => {
  if (req.user) {
    res.status(200).json(books);
  } else {
    res.status(401);
    throw new Error("User unAuhtorized");
  }
};
//@desc   Get book
//@route  GET /api/books/:id
//@access Private

const getBook = (req, res) => {

  const bookId = parseInt(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex=== -1) {
    res.status(404)
  throw new Error('Book not found')
  } else {
    res.status(200).json(books[bookIndex]);
  }
};

//@desc   Publish book
//@route  POST /api/book
//@access Private

const publishBook = (req, res) => {
  const newBook = req.body;

  const { error, value } = bookSchema.validate(newBook);

  if (error) {
    res.status(400);
    throw new Error(error.message);
  } else {
    newBook.id =  Math.floor(Math.random() * 100000) + Date.now(),
    newBook.author_id=req.user.id
    books.push(newBook);
    res.status(201).json(newBook);
  }
};

//@desc   Update book
//@route  PUT /api/book/:id
//@access Private to the author

const updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const bookIndex = books.findIndex((book) => book.id === bookId);
   
  if (bookIndex=== -1) {
    
    res.status(404)
    throw new Error('Book not found')
  } else {
    const { error, value } = bookSchema.validate(updatedBook); // Validate  inputs.

    if (error) {  
      res.status(400)
      throw new Error( error.message )
    
    } else {
      const author_id=parseInt(books[bookIndex].author_id)
      if(author_id===req.user.id){ //Make sure logged in user matches author.

        books[bookIndex] = { ...books[bookIndex], ...updatedBook };
        res.status(200).json({ message: `Updated book ${bookId}` });
      }else{
        res.status(401)
        throw new Error('Only author can update')
      }

    }
  }
};

//@desc   Delete book
//@route  DELETE /api/book/:id
//@access Private to the author

const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex=== -1) {
    res.status(404)
    throw new Error('Book not found')
  } else {
    const author_id=parseInt(books[bookIndex].author_id)
    if(author_id===req.user.id){ //Make sure logged in user matches author.
      books.splice(bookIndex, 1);
      res.status(200).json({ message: `Deleted book ${bookId}` });
    }else{
      throw new Error('Only author can delete')
    }   
  
  }
};

module.exports = {
  getBooks,
  getBook,
  publishBook,
  updateBook,
  deleteBook,
  books
};
