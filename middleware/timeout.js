const ErrorResponse = require('../utils/errorResponse');

const timeoutHandler = (req, res, next) => {
  res.setTimeout(15000, function() {
    return next(new ErrorResponse('Timed out', 408));
  });

  next();
};

module.exports = timeoutHandler;
