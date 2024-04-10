const express = require("express");
const { readFile, writeFile } = require("fs").promises;

const FILE_NAME = "./data/name.txt";

const nameRouter = express.Router();

nameRouter

  .get("/set/:name", async (req, res) => {
    const name = req.params.name;
    await writeFile(FILE_NAME, name, "utf-8");
    res.send(`Imie zostało zapisane ${name}`);
  })

  .get("/show", async (req, res) => {
    const showName = await readFile(FILE_NAME, "utf-8");
    res.send(`Zapisane Imię to ${showName}`);
  })

  .get("/check", async (req, res) => {
    try {
      await readFile(FILE_NAME, "utf-8");
      res.send("There is a name saved");
    } catch (e) {
      res.send("There is no name");
    }
  });

module.exports = {
  nameRouter,
};
