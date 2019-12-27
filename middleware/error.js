const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // copy err object!

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicated key
  if (err.code === 11000) {
    const message = 'Duplicated field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).reduce((newObj, mongoError) => {
      newObj[mongoError.path] = mongoError.message || 'invalid';

      return newObj;
    }, {});

    error = new ErrorResponse(JSON.stringify(message), 400, true);
  }

  let errorMsg = error.isHash ? JSON.parse(error.message) : error.message;
  if (!errorMsg) {
    errorMsg = 'Server Error';
  }

  res.status(error.statusCode || 500).json({
    success: false,
    errors: [errorMsg]
  });
};

module.exports = errorHandler;
