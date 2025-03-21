// Middleware for handling 404 errors (not found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: error.message });
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  // If the response has already been sent, return early to prevent further handling
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Send error response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
