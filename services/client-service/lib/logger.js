const Logger = require('../../../infra/logger');

module.exports = new Logger({
  serviceName: 'client-service',
  transports: {
    prettyConsole: process.env.NODE_ENV === 'development',
  },
});
