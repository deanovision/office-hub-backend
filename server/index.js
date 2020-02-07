const express = require("express");
const cors = require("cors");
const server = express();
const ticketRouter = require("../tickets/ticketsRouter");
const userRouter = require("../users/usersRouter");
const basecampRouter = require("../basecamp/basecampRouter");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("sanity check");
});

server.use("/", basecampRouter);
server.use("/ticket", ticketRouter);
server.use("/user", userRouter);

module.exports = server;
