class InternalServerError extends Error {
  constructor({ message, error = {}, details, displayMessage, displayDetails } = {}, ...args) {
    super(message || error.message, ...args);
    Error.captureStackTrace(this, InternalServerError);
    this.statusCode = 500;
    this.displayMessage = displayMessage || 'Internal Server error';
    this.internalError = error;
    this.details = details;
    this.displayDetails = displayDetails;
  }
}
module.exports = InternalServerError;
