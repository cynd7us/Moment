const winston = require('winston');
const { levels } = require('./loggerLevels');

const { combine, timestamp, json, label, prettyPrint } = winston.format;

const createWinstonLogger = ({
  serviceName,
  transports: { enableConsole = true, prettyConsole } = {},
  transportOverrides = [],
  handleExceptions = true,
  handleRejections = true,
}) => {
  const transports = [...transportOverrides];

  if (enableConsole) {
    if (prettyConsole) {
      transports.push(
        new winston.transports.Console({
          format: combine(label({ label: serviceName }), prettyPrint({ colorize: true, depth: 4 })),
          level: process.env.BASE_LOG_LEVEL || levels.DEBUG,
        }),
      );
    } else {
      transports.push(
        new winston.transports.Console({
          format: combine(label({ label: serviceName }), json()),
          level: process.env.BASE_LOG_LEVEL || levels.DEBUG,
        }),
      );
    }
  }

  const addHostname = winston.format((info) => {
    return { ...info, host: process.env.HOSTNAME };
  });

  const customLevels = {
    levels: {
      [levels.AUDIT]: 4,
      [levels.DEBUG]: 3,
      [levels.INFO]: 2,
      [levels.WARN]: 1,
      [levels.ERROR]: 0,
    },
    colors: { debug: 'cyan', info: 'green', warn: 'yellow', error: 'red' },
  };

  const logger = winston.createLogger({
    format: combine(addHostname(), timestamp()),
    levels: customLevels.levels,
    transports,
    exceptionHandlers: handleExceptions && transports,
    rejectionHandlers: handleRejections && transports,
  });

  return logger;
};

module.exports = {
  createWinstonLogger,
};
