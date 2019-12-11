const server = require("./server");
const mongoose = require("mongoose");
const axios = require("axios");
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

function getToken() {
  const { BC_CLIENT_ID, BC_CLIENT_SECRET, REDIRECT_URI } = process.env;
  axios
    .get(
      `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}
  `
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

server.listen(5000, () => {
  console.log(`SERVER ON ${port}`);
});
