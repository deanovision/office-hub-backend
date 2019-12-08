const express = require("express");
const cors = require("cors");
// const request = require("request");
const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("sanity check");
});

// function makeCall(url) {
//   return new Promise((resolve, reject) => {
//     request(url, { json: false }, (err, res, body) => {
//       if (err) reject(err);
//       resolve(body);
//     });
//   });
// }

module.exports = server;
