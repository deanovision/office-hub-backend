const server = require("./server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

const dbase = process.env.MONGO_DB_CONNECTION;

mongoose.connect(dbase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to database");
});

server.listen(5000, () => {
  console.log(`SERVER ON ${port}`);
});
