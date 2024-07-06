const express = require("express");
const {
  createToken,
  getAllTokens,
  getTokenById,
  deleteToken,
  updateToken,
  keepAliveToken,
} = require("../controllers/index.js");

const route = express.Router();

route.post("/create", createToken);

route.put("/keepalive/:id", keepAliveToken);

route.get("/", getAllTokens);

route.get("/:id", getTokenById);

route.put("/:id", updateToken);

route.delete("/:id", deleteToken);

module.exports = route;
