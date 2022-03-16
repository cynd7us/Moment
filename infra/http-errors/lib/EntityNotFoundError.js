class EntityNotFoundError extends Error {
  constructor({ message, error = {}, details, displayMessage, displayDetails } = {}, ...args) {
    super(message || error.message, ...args);
    Error.captureStackTrace(this, EntityNotFoundError);
    this.statusCode = 404;
    this.displayMessage = displayMessage || 'Not found error';
    this.internalError = error;
    this.details = details;
    this.displayDetails = displayDetails;
  }
}
module.exports = EntityNotFoundError;
