/* eslint-disable global-require */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Logger = require('../../logger');

Logger.initDefaultLogger({ serviceName: 'db-migrations', transports: { prettyConsole: true } });

const setupEnv = async () => {
  // TODO: Setup secrets
};

const logger = Logger.defaultLogger;

const migrate = async () => {
  let modifier = '';
  if (process.env.UNDO_TO && process.env.UNDO_TO.length > 0) {
    modifier = `:undo:all ---to ${process.env.UNDO_TO}`;
  } else if (process.env.UNDO_LATEST && process.env.UNDO_LATEST !== 'false') {
    modifier = ':undo';
  } else if (process.env.UNDO_ALL && process.env.UNDO_ALL !== 'false') {
    modifier = ':undo:all';
  }

  logger.info(`Running migration for env=${process.env.NODE_ENV}, with modifier=${modifier}`);
  const connectionString = process.env.DATABASE_URL;
  exec(
    `npx sequelize db:migrate${modifier} --migrations-path 'infra/db/migrate/migrations' --url=${connectionString}`,
    (err, stdout, stderr) => {
      logger.info(`output ${stdout}`);
      if (err) {
        logger.error(`exec error: ${err}, ${stderr}`);
      }
    },
  );
};

(async () => {
  try {
    await setupEnv();
  } catch (error) {
    logger.error('Failed to setup migration env');
  }

  await migrate();
})();
