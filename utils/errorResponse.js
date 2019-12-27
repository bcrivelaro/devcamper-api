class ErrorResponse extends Error {
  constructor(message, statusCode, isHash = false) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isHash = isHash;
  }
}

module.exports = ErrorResponse;
