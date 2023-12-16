class ExpressError extends Error {
  constructor(message = 'default error', statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;