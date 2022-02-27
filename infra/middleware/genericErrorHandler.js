const _ = require('lodash');
const accepts = require('accepts');

const handleNonJsonResponse = ({ error, req, res, nonJsonErrorResponse, displayMessage }) => {
  if (nonJsonErrorResponse) return nonJsonErrorResponse({ error, req, res });

  return res.status(error.statusCode).send(displayMessage);
};

module.exports = ({ logger, jsonErrorResponse, nonJsonErrorResponse }) => (
  error,
  req,
  res,
  next,
) => {
  if (res.headersSent) {
    return next(error);
  }

  let errorLevel;
  if (!error.statusCode || _.inRange(error.statusCode, 500, 599) || error.isCritical) {
    errorLevel = 'error';
  } else {
    errorLevel = 'warn';
  }

  logger[errorLevel](error.message || 'request failed', { error });

  const displayMessage =
    error.displayMessage ||
    'Something went wrong, please try again or contact us at support@moment.com';

  const accept = accepts(req);

  switch (accept.type(['json', 'html'])) {
    case 'json':
      if (jsonErrorResponse) return jsonErrorResponse({ error, req, res });

      return res
        .status(error.statusCode || 500)
        .json(
          _.extend(
            { message: displayMessage },
            error.displayDetails ? { details: error.details } : {},
          ),
        );
    default:
      return handleNonJsonResponse({ error, req, res, nonJsonErrorResponse, displayMessage });
  }
};
