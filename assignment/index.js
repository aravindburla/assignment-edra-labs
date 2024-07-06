const express = require("express");
const route = require("./routes/index.js");
const app = express();
const db = require("./models/index.js");
const cron = require("node-cron");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

cron.schedule("* * * * *", async () => {
  console.log("hitted every minute");
  const allTokens = await db.Token.findAll({
    keep_alive: false,
  });

  for (const token of allTokens) {
    const tokenCreatedAt = token.createdAt;
    const currentDate = new Date();
    console.log(token);
    if (
      currentDate.getMinutes() - new Date(tokenCreatedAt).getMinutes() >= 5 &&
      !token.keep_alive
    ) {
      await token.destroy();
    }
  }

  console.log("hit completed");
});

cron.schedule("* * * * *", async () => {
  console.log("hitted every minute");
  const allTokens = await db.Token.findAll({
    keep_alive: false,
  });

  for (const token of allTokens) {
    const tokenCreatedAt = token.createdAt;
    const currentDate = new Date();
    console.log(token);
    if (
      currentDate.getMinutes() - new Date(tokenCreatedAt).getMinutes() >= 1 &&
      token.isblocked_at
    ) {
      token.isblocked_at = null;
      token.status = "";
      await token.save();
    }
  }

  console.log("hit completed");
});

app.use("/keys", route);
const PORT = process.env.PORT || 8080;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
