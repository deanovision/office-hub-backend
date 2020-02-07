const User = require("./usersModel");

const createUser = (req, res) => {
  const UserInfo = req.body;

  User.create(UserInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  createUser
};
