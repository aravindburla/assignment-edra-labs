const db = require("./models/index.js");

const deleteExpiredKeys = async () => {
  console.log("hitted");
  try {
    const allTokens = await db.Token.findAll({
      keep_alive: false,
    });

    for (const token of allTokens) {
      const tokenCreatedAt = token.createdAt;
      const currentDate = new Date();

      if (
        currentDate.getMinutes() - new Date(tokenCreatedAt).getMinutes() >=
        1
      ) {
        await token.destroy();
      }
    }
  } catch (error) {}
};

module.exports = {
  deleteExpiredKeys,
};
