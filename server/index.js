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

server.get("/auth_bc", (req, res) => {
  const { BC_CLIENT_ID, REDIRECT_URI } = process.env;
  res.status(200).json({
    url: `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  });
});

server.get("/test", (req, res) => {
  const { BC_CLIENT_ID, BC_CLIENT_SECRET, REDIRECT_URI } = process.env;

  axios
    .post(
      `https://launchpad.37signals.com/authorization/token?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${BC_CLIENT_SECRET}&code=${req.query.code}
      `
    )
    .then(token => {
      console.log(token.data);
      res.status(200).json(token.data);
    })
    .catch(err => console.log(err));

  // res.send(
  //   `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  // );
});

function withAxios(method, url, token, data = {}) {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "User-Agent": "Office Hub Dev (rodeanfraser@gmail.com)"
    }
  });
}

server.post("/auth_token", (req, res) => {
  console.log(req.body.token, req.body.url);
  withAxios("post", req.body.url, req.body.token, req.body.package)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err));
});

server.use("/ticket", ticketRouter);

module.exports = server;
