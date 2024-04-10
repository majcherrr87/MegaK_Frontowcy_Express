const express = require("express");
const cookieParser = require("cookie-parser");

const { nameRouter } = require("./routes/name");
const { voteRouter } = require("./routes/voteRouter");
const { calcRouter } = require("./routes/calc");
const { cookieRouter } = require("./routes/cookie");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/name", nameRouter);
app.use("/vote", voteRouter);
app.use("/calc", calcRouter);
app.use("/cookie", cookieRouter);

app.listen(3000, "localhost");
