# Node.js Book Library API

This is a simple Node.js Book API that allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books. The API is built using the Express.js framework and uses a simple in-memory data store to store the book collection. The API has been thoroughly tested using Mocha and Chai. All the routes related to goals are protected by JWT authentication, and only the author of a book can update or delete the book.

## Getting Started

To get started with the Books Library API, follow the instructions below.

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository from GitHub:

```
git clone https://github.com/your-username/books-library-api.git
cd books-library-api
```

2. Install the dependencies:

```
npm install
```

### Usage

1. Start the Node.js server:

```
npm start
```

2. The API server will now be running at `http://localhost:5000`.

### Endpoints

The following API endpoints are available:

#### Book Routes

- `GET /api/books`: Fetch all books in the library.
- `GET /api/books/:id`: Get details of a specific book by ID.
- `POST /api/books`: Add a new book to the library.
- `PUT /api/books/:id`: Update details of a specific book by ID (only accessible to the book's author).
- `DELETE /api/books/:id`: Delete a specific book by ID (only accessible to the book's author).

#### User Routes

- `GET /api/users`: Fetch all users.
- `POST /api/users`: Add a new user.
- `POST /api/users/login`: Authenticate a user and obtain a token for further API access.
- `GET /api/users/me`: Get details of the currently authenticated user.

### Data Format

A book object in the library has the following format:

```json
{
  "id": "1",
  "title": "Example Book",
  "author": "John Doe",
  "publicationYear": 2020
}
```

A user object has the following format:

```json
{
  "id": "1",
  "username": "example_user",
  "email": "user@example.com",
  "password": "hashed_password"
}
```

### Example Usage

Assuming the server is running at `http://localhost:5000`, here are some example API calls:

#### Book Routes

- Fetch all books:
  ```
  GET http://localhost:5000/api/books
  ```

- Get details of a specific book (ID = 1):
  ```
  GET http://localhost:5000/api/books/1
  ```

- Add a new book:
  ```
  POST http://localhost:5000/api/books
  Content-Type: application/json

  {
    "title": "New Book",
    "author": "Jane Smith",
    "publicationYear": 2022
  }
  ```

- Update details of a specific book (ID = 1, accessible to the book's author):
  ```
  PUT http://localhost:5000/api/books/1
  Authorization: Bearer YOUR_ACCESS_TOKEN
  Content-Type: application/json

  {
    "title": "Updated Book Title"
  }
  ```

- Delete a specific book (ID = 1, accessible to the book's author):
  ```
  DELETE http://localhost:5000/api/books/1
  Authorization: Bearer YOUR_ACCESS_TOKEN
  ```

#### User Routes

- Fetch all users:
  ```
  GET http://localhost:5000/api/users
  ```

- Add a new user:
  ```
  POST http://localhost:5000/api/users
  Content-Type: application/json

  {
    "username": "new_user",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- Authenticate and obtain an access token:
  ```
  POST http://localhost:5000/api/users/login
  Content-Type: application/json

  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- Get details of the currently authenticated user:
  ```
  GET http://localhost:5000/api/users/me
  Authorization: Bearer YOUR_ACCESS_TOKEN
  ```

### Testing

The API has been thoroughly tested using Mocha and Chai. To run the tests, use the following command:

```
npm test
```




## Acknowledgments

Special thanks to the HomeDot team for reviewing this project and considering my contribution. I appreciate the effort and time invested in the evaluation process, and I am excited about the possibility of being a part of the HomeDot team.

Special thanks to the Express.js team for providing a fantastic framework for building web applications with Node.js.