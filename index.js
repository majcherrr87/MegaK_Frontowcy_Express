const express = require("express");
const { join } = require("path");

const app = express();

app.get("/", (req, res) => {
  res.cookie("ciastko", "czekoladowe bez cukru").send("hello world!");
});

app.listen(3000);
