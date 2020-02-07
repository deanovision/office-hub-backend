const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    created: { type: Date, required: true, default: Date.now() }
  },

  { strict: false }
);

module.exports = mongoose.model("User", userSchema);
