const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../users/usersModel");

router.get("/get_token", (req, res) => {
  const { BC_CLIENT_ID, BC_CLIENT_SECRET, REDIRECT_URI } = process.env;
  const authCode = req.query["?code"];
  // Getting Token
  axios
    .post(
      `https://launchpad.37signals.com/authorization/token?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${BC_CLIENT_SECRET}&code=${authCode}
      `
    )
    // Use token to get user id in order to make other API calls
    .then(token => {
      withAxios(
        "get",
        "https://launchpad.37signals.com/authorization.json",
        token.data.access_token
      )
        // Send token and user id to front-end app
        .then(profile => {
          console.log(profile);
          res.status(200).json({
            access_token: token.data.access_token,
            company_id: profile.data.accounts[0].id,
            profile_data: profile.data
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/get_profile", (req, res) => {
  const { company_id, token } = req.body;
  console.log(company_id, token);
  withAxios(
    "get",
    `https://basecamp.com/${company_id}/api/v1/people/me.json`,
    token
  )
    .then(async profile => {
      //check if user exists if not add user to database
      userExists = await User.exists({ identity_id: profile.data.identity_id });
      userExists
        ? res
            .status(200)
            .json({ profile: profile.data, message: "user found on mongoDB" })
        : User.create(profile.data)
            .then(user => {
              console.log(user);
              res
                .status(200)
                .json({
                  profile: profile.data,
                  user: user,
                  message: "user not found on mongoDB"
                });
            })
            .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err));
});

router.post("/get_projects", (req, res) => {
  const { company_id, token } = req.body;
  console.log(company_id, token);
  withAxios(
    "get",
    `https://basecamp.com/${company_id}/api/v1/projects.json`,
    token
  )
    .then(projects => {
      // console.log(profile.data);
      res.status(200).json(projects.data);
    })
    .catch(err => console.log(err));
});

router.post("/get_project", (req, res) => {
  const { company_id, project_id, token } = req.body;
  console.log(company_id, token);
  withAxios(
    "get",
    `https://basecamp.com/${company_id}/api/v1/projects/${project_id}/todolists.json`,
    token
  )
    .then(project => {
      console.log(project.data);
      res.status(200).json(project.data);
    })
    .catch(err => console.log(err));
});

router.get("/auth_bc", (req, res) => {
  const { BC_CLIENT_ID, REDIRECT_URI } = process.env;
  res.status(200).json({
    url: `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${BC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  });
});

function withAxios(method, url, token, data = {}) {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "User-Agent": "Todo Templates (rodean.fraser@yourdigitalresource.com)"
    }
  });
}

router.post("/auth_token", (req, res) => {
  console.log(req.body.token, req.body.url);
  withAxios("post", req.body.url, req.body.token, req.body.package)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err));
});
module.exports = router;
