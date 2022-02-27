module.exports = function buildTvShow(sequelize, DataTypes) {
  const tvShow = sequelize.define(
    'tvShow',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      metadata: { type: DataTypes.JSONB, allowNull: true },
    },
    { paranoid: true, timestamps: true, schema: 'public' },
  );

  return tvShow;
};
