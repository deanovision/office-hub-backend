const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    // ticketId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Ticket",
    //   required: true
    // },
    created: { type: Date, required: true, default: Date.now() }
  },

  { strict: false }
);

module.exports = mongoose.model("Ticket", ticketSchema);
