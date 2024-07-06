const db = require("../models/index");
const { generateApiKey } = require("generate-api-key");

const createToken = async (req, res) => {
  try {
    const token = await db.Token.create({
      token: generateApiKey(),
    });
    return res.json(token);
  } catch (error) {
    console.log(error);
  }
};

const getAllTokens = async (req, res) => {
  try {
    const allTokens = await db.Token.findAll();
    return res.json(allTokens);
  } catch (error) {
    console.log(error);
  }
};

const getTokenById = async (req, res) => {
  try {
    const tokenId = req.params.id;
    if (!tokenId) {
      return res.json("Please provide token id.");
    }

    const token = await db.Token.findOne({
      where: {
        is_blocked: false,
      },
    });

    if (!token) {
      return res.json(`No keys found`);
    }

    token.status = "in-use";
    token.blocked_at = new Date();
    await token.save();

    return res.json(token);
  } catch (error) {
    console.log(error);
  }
};

const deleteToken = async (req, res) => {
  try {
    const tokenId = req.params.id;

    if (!tokenId) {
      return res.json("Please provide token id.");
    }

    const token = await db.Token.findByPk(tokenId);

    if (!token) {
      return res.json(`Token not found for id ${tokenId}`);
    }

    await token.destroy();

    return res.json(`Token is deleted`);
  } catch (error) {}
};

const updateToken = async (req, res) => {
  try {
    const tokenId = req.params.id;
    if (!tokenId) {
      return res.json("Please provide token id.");
    }

    const token = await db.Token.findByPk(tokenId);

    if (!token) {
      return res.json(`Token not found for id ${tokenId}`);
    }

    token.is_blocked = req.body.is_blocked ? req.body.is_blocked : false;
    token.keep_alive = req.body.keep_alive ? req.body.keep_alive : false;

    await token.save();

    return res.json("Token is updated");
  } catch (error) {
    console.log(error);
  }
};

const keepAliveToken = async (req, res) => {
  try {
    const tokenId = req.params.id;
    if (!tokenId) {
      return res.json("Please provide token id.");
    }

    const token = await db.Token.findByPk(tokenId);

    if (!token) {
      return res.json(`Token not found for id ${tokenId}`);
    }

    (token.keep_alive = true), await token.save();

    return res.json("Token is alive");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  deleteToken,
  updateToken,
  keepAliveToken,
};
