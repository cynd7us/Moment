const { init: initCache } = require('../../infra/cache');

const port = process.env.PORT || 5868;
let logger = console;

const setUpEnv = () => {
  initCache();
  // eslint-disable-next-line global-require
  logger = require('./lib/logger');
};

module.exports = () => {
  setUpEnv();
  try {
    // eslint-disable-next-line global-require
    const initApp = require('./app');
    const app = initApp();
    app.listen(port, () => {
      logger.info(`client-service now listening on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start & listen server', { error });
  }
};
