const cls = require('cls-hooked');
const _ = require('lodash');
const { createWinstonLogger } = require('./lib/winstonLogger');
const { levels } = require('./lib/loggerLevels');

async function setContextParams({ ns, contextParams }) {
  let err;
  try {
    // Save basic request info in the context params
    ns.set('contextParams', {
      env: process.env.NODE_ENV,
      namespace: process.env.NAMESPACE,
      host: process.env.HOSTNAME,
      ...contextParams,
    });
  } catch (error) {
    this.logger.error('[LOGGER SETUP] Error setting context params', {
      contextParams,
      error,
    });
    err = error;
  }

  return err;
}

/**
 *
 * @param {Logger} logger - an instance of Logger
 * @param {string} serviceName
 * @returns {Object} - The namespace, if exists, or an empty object otherwise
 */
const getContextParams = ({ logger, serviceName }) => {
  const ns = cls.getNamespace(serviceName);
  if (ns && ns.active) {
    try {
      return ns.get('contextParams') || {};
    } catch (error) {
      logger.error('[LOGGER SETUP] Error getting context params', { error });
    }
  }

  return {};
};

/**
 *
 * @param {boolean} sendEventOnError - the default value defined upon logger instantiation
 * @param {string} level - log level (e.g. 'info', 'error', etc.)
 * @param {boolean} [SendThisLogEvent] - this param's value will override the default sendEventOnError. If undefined - sendEventOnError's value will prevail
 * @returns {boolean}
 */
const shouldSendEventToTransports = ({ sendEventOnError, level, sendThisLogEvent }) => {
  return (
    (sendEventOnError && level === levels.ERROR && sendThisLogEvent !== false) || !!sendThisLogEvent
  );
};

/* 
Axios errors are problematic, so we don't want our cleaner to drill down further.
I'm just leaving this as preparation for other nasty errors that might come later.
*/
const isKnownComplexUnloggableError = ({ error }) => error.isAxiosError;

const getCleanError = ({
  error,
  result = {},
  fieldsToRemove,
  fieldsToWhitelist,
  fieldsToSanitize,
  depth = 0,
  maxDepth,
}) => {
  _.each(Object.getOwnPropertyNames(error), (key) => {
    if (
      _.isError(error[key]) &&
      !isKnownComplexUnloggableError({ error: error[key] }) &&
      depth < maxDepth
    ) {
      _.set(result, key, {});
      return getCleanError({
        error: error[key],
        result: result[key],
        fieldsToRemove,
        fieldsToWhitelist,
        fieldsToSanitize,
        depth: depth + 1,
        maxDepth,
      });
    }

    if (!_.isUndefined(error[key])) {
      _.set(result, key, {
        meta: _.isFunction(error[key].toJSON) ? error[key].toJSON() : error[key],
        key,
      });
    }
  });

  return result;
};

/**
 *
 * @param {string} level - log level (e.g. 'info', 'error', etc.)
 * @param {Logger} logger - an instance of Logger
 * @param {string} serviceName
 * @param {boolean} [sendEventOnError] - Send an event to DataDog on error
 * @returns {function(string, Object, Object)} - A function that receives a log message, relevant log parameters, and options (for specific logging cases).
 */
const handleLogMessage = ({ level, logger, serviceName, sendEventOnError }) => (
  message,
  params = {},
  options = {
    sendEvent: undefined,
  },
) => {
  let error;
  _.map(params, (param) => {
    if (param instanceof Error) {
      error = {
        kind: param.name,
        ...getCleanError({
          error: param,
        }),
      };
      return param;
    }

    return param;
  });

  const pureParams = _.omitBy(params, _.isError);
  const contextParams = getContextParams({ logger, serviceName });

  const eventData = {
    level,
    message,
  };

  logger.log({
    ...contextParams,
    ...eventData,
    ...pureParams,
    error,
  });

  const shouldSendEvent = shouldSendEventToTransports({
    sendEventOnError,
    level,
    sendThisLogEvent: options.sendEvent,
  });
  if (shouldSendEvent) {
    /* TODO: Send to transport */
  }
};

class Logger {
  /**
   *
   * @param {string} serviceName
   * @param {object} [transports] - Enabled Transports
   * @param {boolean} [enableConsole] - Send log to console
   * @param {boolean} [prettyConsole] - Send log to Pretty-Print console
   * @param {object} [keys] - Keys for external logging services (datadog, logzio)
   * @param {boolean} [sendEventOnError] - Send an event to DataDog on error
   * @param {Array} [transportOverrides] - Your custom transports, should you choose to send logs to them
   * @param {boolean} [handleExceptions] - Handle uncaughtExceptions (log them)
   * @param {boolean} [handleRejections] - Handle uncaughtPromiseRejections (log them)
   */
  constructor({
    serviceName,
    transports: { enableConsole = true, prettyConsole } = {},
    sendEventOnError = true,
    transportOverrides = [],
  } = {}) {
    this.logger = createWinstonLogger({
      serviceName,
      transports: { enableConsole, prettyConsole },
      transportOverrides,
    });
    this.serviceName = serviceName;

    this.logger.on('error', (err) => {
      throw err;
    });

    Object.values(levels).forEach((level) => {
      this[level] = handleLogMessage({
        level,
        serviceName: this.serviceName,
        logger: this.logger,
        sendEventOnError,
      });
    });
  }

  /**
   *
   * @param {Object} [contextParams] - parameters that will appear in all the request-logs within a certain context
   * @param {Function} next - next middleware
   */
  initLoggingContextWithCallback({ contextParams = {}, next, errorCallback }) {
    let ns = cls.getNamespace(this.serviceName);
    if (!ns) ns = cls.createNamespace(this.serviceName);

    if (!_.isFunction(errorCallback)) {
      throw new Error('errorCallback must be a function');
    }

    ns.runPromise(async () => {
      const err = setContextParams.apply(this, [{ ns, contextParams }]);

      const possiblePromise = next(err);
      if (possiblePromise instanceof Promise) {
        possiblePromise.catch(errorCallback);
      }
    });
  }

  initLoggingContext({ contextParams = {}, next }) {
    let ns = cls.getNamespace(this.serviceName);
    if (!ns) ns = cls.createNamespace(this.serviceName);

    try {
      ns.run(() => {
        const err = setContextParams.apply(this, [{ ns, contextParams }]);

        try {
          next(err);
        } catch (errFromNext) {
          errFromNext.isRelatedToNextFn = true;

          throw errFromNext;
        }
      });
    } catch (error) {
      if (error.isRelatedToNextFn) throw error;

      this.logger.error('[LOGGER SETUP] Error initializing namespace', {
        contextParams,
        error,
      });

      next(error);
    }
  }

  /**
   *
   * @param {Object} addedParams - extra parameters to add to a context
   */
  addToContext(addedParams) {
    const ns = cls.getNamespace(this.serviceName);
    if (ns && ns.active) {
      try {
        const currentParams = ns.get('contextParams');
        ns.set('contextParams', {
          ...currentParams,
          ...addedParams,
        });
      } catch (error) {
        this.logger.error('[LOGGER SETUP] Error adding parameter to context', {
          addedParams,
          error,
        });
      }
    }
  }

  /**
   *
   * @param {Object} addedParams - extra parameters to add to a context
   */
  getContext() {
    const ns = cls.getNamespace(this.serviceName);
    if (ns && ns.active) {
      try {
        const currentParams = ns.get('contextParams');
        return currentParams;
      } catch (error) {
        this.logger.error('[LOGGER SETUP] Error getting context', {
          error,
        });
      }
    }
  }

  /**
   * When running tests, initDefaultLogger doesn't run in index.js, so the following method is used
   * make sure that the logger won't be undefined in the test environment
   */
  static get defaultLogger() {
    if (!this.standardLogger) {
      this.initDefaultLogger({ serviceName: `${process.env.NODE_ENV}DefaultLogger` });
    }

    return this.standardLogger;
  }

  // Same options as the constructor
  static initDefaultLogger(options) {
    this.standardLogger = new Logger(options);
  }
}

module.exports = Logger;
