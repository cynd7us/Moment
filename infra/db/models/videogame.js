module.exports = function buildVideoGame(sequelize, DataTypes) {
  const videoGame = sequelize.define(
    'videoGame',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      metadata: { type: DataTypes.JSONB, allowNull: true },
    },
    { paranoid: true, timestamps: true, schema: 'public' },
  );

  return videoGame;
};
