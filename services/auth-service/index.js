const port = process.env.PORT || 5869;

const setUpEnv = () => {
  // TODO: init database
};

module.exports = () => {
  setUpEnv();
  try {
    // eslint-disable-next-line global-require
    const initApp = require('./app');
    const app = initApp();
    app.listen(port, () => {
      console.log(`auth-service now listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start & listen server', { error });
    throw error;
  }
};
