const express = require("express");

const { nameRouter } = require("./routes/name");
const { voteRouter } = require("./routes/voteRouter");
const { calcRouter } = require("./routes/calc");

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use("/name", nameRouter);
app.use("/vote", voteRouter);
app.use("/calc", calcRouter);

app.listen(3000, "localhost");
