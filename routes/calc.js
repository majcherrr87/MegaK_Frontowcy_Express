const express = require("express");

const calcRouter = express.Router();

calcRouter.post("/check", (req, res) => {
  const { NumberA, NumberB } = req.body;
  console.log({ NumberA, NumberB });

  res.json({ divider: NumberA % NumberB === 0 });
});

module.exports = {
  calcRouter,
};
