const express = require("express");
const { createTicket } = require("./ticketsController");
const router = express.Router();

router.post("/", createTicket);

module.exports = router;
