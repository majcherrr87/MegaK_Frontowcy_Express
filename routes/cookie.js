const express = require("express");

const cookieRouter = express.Router();

cookieRouter
  .post("/set", (req, res) => {
    const { name } = req.body;
    res
      .cookie("name", name, { maxAge: 30 * 24 * 60 * 60 * 1000 })
      .send(`Imię ${name} zostało zapisane`);
  })
  .get("/show", (req, res) => {
    const { name } = req.cookies;
    res.send(name ? `zapisane imię to ${name}` : "Brak imienia");
  })
  .get("/check", (req, res) => {
    const { name } = req.cookies;
    res.send(name ? "Imię jest zapamiętane" : "Nie ma takirgo imienia");
  });

module.exports = {
  cookieRouter,
};
