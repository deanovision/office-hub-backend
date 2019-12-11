const Ticket = require("./ticketsModel");

const createTicket = (req, res) => {
  const ticketInfo = req.body;

  Ticket.create(ticketInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  createTicket
};
