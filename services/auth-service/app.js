const express = require('express');

const app = express();

const healthCheckRoute = '/health_check';

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const backendVersion = process.env.BACKEND_VERSION || 'unknown';

module.exports = () => {
  app.get('/', (req, res) => {
    res.send('auth-service API');
  });
  // app.get(healthCheckRoute, healthCheck);
  app.get('/backend-version', (req, res) => res.json({ backendVersion }));

  // REST API
  /*
    app.use(
        genericErrorHandler({
        logger,
        }),
    );
    */
  return app;
};
