module.exports = function buildBook(sequelize, DataTypes) {
  const book = sequelize.define(
    'Book',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      metadata: { type: DataTypes.JSONB, allowNull: true },
    },
    { paranoid: true, timestamps: true, schema: 'public' },
  );

  return book;
};
