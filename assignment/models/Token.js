module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "token",
    {
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blocked_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      keep_alive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tablename: "tokens",
      paranoid: true,
    }
  );

  return Token;
};
