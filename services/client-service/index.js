const { initData } = require('./lib/init-data');

const port = process.env.PORT || 5868;
let logger = console;

const setUpEnv = async () => {
  // eslint-disable-next-line global-require
  logger = require('./lib/logger');
  // eslint-disable-next-line global-require
  await initData();
};

module.exports = async () => {
  await setUpEnv();
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
