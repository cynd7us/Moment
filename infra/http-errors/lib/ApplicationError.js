class ApplicationError extends Error {
  constructor({ message, error = {}, details, displayMessage, displayDetails } = {}, ...args) {
    super(message || error.message, ...args);
    Error.captureStackTrace(this, ApplicationError);
    this.statusCode = 500;
    this.displayMessage = displayMessage || 'Application Error';
    this.internalError = error;
    this.details = details;
    this.displayDetails = displayDetails;
  }
}
module.exports = ApplicationError;
