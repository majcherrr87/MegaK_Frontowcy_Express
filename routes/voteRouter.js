const express = require("express");
const { IpRestrict } = require("../utils/ip-restrict");

const voteRouter = express.Router();

const votes = {
  yes: 0,
  no: 0,
};

const ipRestrict = new IpRestrict();

voteRouter
  .get("/check", (req, res) => {
    const info = Object.entries(votes)
      .map(([name, count]) => `Votes on ${name}: ${count}`)
      .join("<br>");
    res.send(info);
  })
  .get("/:voteName", (req, res) => {
    if (!ipRestrict.check(req.ip)) {
      res.status(403).send("Głos już oddano wcześniej ");
      return;
    }
    const { voteName } = req.params;
    if (typeof votes[voteName] === "undefined") {
      votes[voteName] = 0;
    }
    votes[voteName]++;
    res.send("dziękujemy za głos ");
  });

module.exports = {
  voteRouter,
};
