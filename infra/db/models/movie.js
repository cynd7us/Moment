module.exports = function buildMovie(sequelize, DataTypes) {
  const movie = sequelize.define(
    'Movie',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      metadata: { type: DataTypes.JSONB, allowNull: true },
    },
    { paranoid: true, timestamps: true, schema: 'public' },
  );

  return movie;
};
