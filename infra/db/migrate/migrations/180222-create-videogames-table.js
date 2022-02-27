module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('VideoGames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      name: Sequelize.STRING,
      metadata: {
        allowNull: false,
        type: Sequelize.JSONB,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('VideoGames'),
};
