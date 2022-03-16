/* eslint-disable global-require */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Logger = require('@moment/logger');

Logger.initDefaultLogger({
  serviceName: 'db-migrations',
  prettyConsole: true,
});
const logger = Logger.defaultLogger;

const setupEnv = async () => {
  /* TODO: setup secrets ? */
};

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
  let stdout;
  const connectionString = process.env.DATABASE_URL;
  try {
    const cmd = await exec(
      `npx sequelize db:migrate${modifier} --migrations-path 'infra/db/migrate/migrations' --url=${connectionString}`,
    );
    stdout = cmd.stdout;
  } catch (error) {
    throw new Error(error.stderr);
  }

  logger.info(`Running migration: ${stdout}`);
};

(async () => {
  try {
    await setupEnv();
  } catch (error) {
    logger.error('Failed to setup migration env');
  }

  try {
    await migrate();
  } catch (error) {
    logger.error('Error running migration', { error });
  }
})();
