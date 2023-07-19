const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;
  res.status(statusCode).json({
    ErrorMessage: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};


module.exports={
    errorHandler,
}