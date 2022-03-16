/* eslint-disable global-require, import/no-dynamic-require */
const { readdirSync } = require('fs');
const { join } = require('path');
const Sequelize = require('sequelize');
const logger = require('../logger').defaultLogger;

let sequelize;
const models = {};
const getSequelize = () => sequelize;
const connectionUrl = process.env.DATABASE_URL;

// Initialize Sequelize
const init = (sequelizeInstance) => {
  sequelize =
    sequelizeInstance ||
    new Sequelize(connectionUrl, {
      dialect: 'postgres',
      logging: process.env.SEQUELIZE_LOGGING ? process.env.SEQUELIZE_LOGGING === 'true' : false,
      operatorsAliases: 0,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        rejectOnEmpty: true,
      },
    });

  // Set Op to support sequelize v5
  sequelize.Op = Sequelize.Op;

  // Load all app models
  readdirSync(join(__dirname, `models`))
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach((file) => {
      const model = require(join(__dirname, `models`, file))(sequelize, Sequelize.DataTypes);
      models[model.name] = model;
    });

  // Create associations
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

// Init quickly when developing and testing
if (!sequelize && ['development'].includes(process.env.NODE_ENV)) {
  init();
}

const initDb = (sequelizeInstance) => {
  // Initialize only once
  if (sequelize && !sequelizeInstance) return;

  logger.info('Initializing Sequelize');
  init(sequelizeInstance);
  logger.info('Sequelize is ready');
};

module.exports = { initDb, getSequelize, models };
