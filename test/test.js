const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/server");

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe("User API", () => {
  let authToken; // Declare a  JWT token

  // User registration and get the token
  before((done) => {
    chai
      .request(server)
      .post("/api/users")
      .send({
        username: "testuser", //Only validated fields
        email: "testuser@example.com",
        password: "testpassword",
      })
      .end((err, response) => {
        authToken = response.body.token; // Get token
        done();
      });
  });

  //@ Test the user login
  describe("POST /api/users/login", () => {
    it("It should login a user and get the token", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "testuser@example.com", //Only validated fields
          password: "testpassword",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("token"); // Ensure token is present
          authToken = response.body.token;
          done();
        });
    });
  });

  //@ Test the private route to get user details
  describe("GET /api/users/me", () => {
    it("It should get the user details", (done) => {
      chai
        .request(server)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${authToken}`) // Set the JWT token in header
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id"); // Ensure user details are present
          response.body.should.have.property("username");
          response.body.should.have.property("email");
          done();
        });
    });
  });

  //----------- Test cases for book controller routes using the same authToken---------------

  describe("Book API", () => {
    let bookId;

    //@ Test the book publish route
    describe("POST /api/books", () => {
      it("It should publish a new book", (done) => {
        chai
          .request(server)
          .post("/api/books")
          .set("Authorization", `Bearer ${authToken}`) // Set the JWT token in the request header
          .send({
            genre: "Fantasy", //Only validated fields
            title: "The Magical Adventure",
            author: "John Doe",
            publishedYear: "2023",
            content: "Once upon a time...",
          })
          .end((err, response) => {
            response.should.have.status(201);
            response.body.should.have.property("id");
            bookId = response.body.id; //store id
            done();
          });
      });
    });

    //@ Test the book get route by id
    describe("GET /api/books/:id", () => {
      it("It should get a book by id", (done) => {
        chai
          .request(server)
          .get(`/api/books/${bookId}`)
          .set("Authorization", `Bearer ${authToken}`) // Set the JWT token in the request header
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have.property("id", bookId);
            done();
          });
      });
    });

    //@ Test the book update route
    describe("PUT /api/books/:id", () => {
      it("It should update a book", (done) => {
        chai
          .request(server)
          .put(`/api/books/${bookId}`)
          .set("Authorization", `Bearer ${authToken}`) // Set the JWT token in the request header
          .send({
            genre: "Adventure", // Only vlaidated feilds
            title: "The Exciting Journey",
            author: "John Doe",
            publishedYear: "2021",
            content: "Once upon a time...",
          })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have.property(
              "message",
              `Updated book ${bookId}`
            );
            done();
          });
      });
    });

    //@ Test the book delete route
    describe("DELETE /api/books/:id", () => {
      it("It should delete a book", (done) => {
        chai
          .request(server)
          .delete(`/api/books/${bookId}`)
          .set("Authorization", `Bearer ${authToken}`) // Set the JWT token in  header
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have.property(
              "message",
              `Deleted book ${bookId}`
            );
            done();
          });
      });
    });
  });
});
