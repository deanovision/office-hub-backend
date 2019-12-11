const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();
const ticketRouter = require("../tickets/ticketsRouter");

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("sanity check");
});

server.get("/test", (req, res) => {
  const { BC_CLIENT_ID, BC_CLIENT_SECRET, REDIRECT_URI } = process.env;

  axios
    .get(
      `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}
`
    )
    .then(site => res.send(site.data))
    .catch(err => console.log(err));

  // res.send(
  //   `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  // );
});

server.use("/ticket", ticketRouter);

module.exports = server;
