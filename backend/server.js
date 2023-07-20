const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const helmet=require('helmet')
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const booksRouter = require("../backend/routes/booksRoutes");
const usersRouter = require("../backend/routes/usersRoutes");

const app = express();
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`server started on port ${PORT}`.rainbow));


module.exports=app