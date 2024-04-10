const express = require("express");
const { readFile, writeFile } = require("fs").promises;

const app = express();

app.get("/name/set/:name", async (req, res) => {
  const name = req.params.name;
  await writeFile("name.txt", name, "utf-8");
  res.send(`Imie zostało zapisane ${name}`);
});

app.get("/name/show", async (req, res) => {
  showName = await readFile("name.txt", "utf-8");
  res.send(`Zapisane Imię to ${showName}`);
});

app.get("/name/check", async (req, res) => {
  try {
    await readFile("name.txt", "utf-8");
    res.send("There is a name saved");
  } catch (e) {
    res.send("There is no name");
  }
});

app.get("/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = Number(a) + Number(b);
  res.send(`${a} + ${b} = ${sum}`);
});

app.listen(3000);
