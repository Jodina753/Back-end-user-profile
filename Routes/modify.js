const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");
const sha256 = require("sha256");

app.patch("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.headers.email)
  );

  if (results[0].count === 0) {
    if (req.body.email) {
      req.asyncMySQL(
        selectQueries.updateEmail(req.body.email, req.headers.token)
      );
    }

    if (req.body.username) {
      req.asyncMySQL(
        selectQueries.updateUsername(req.body.username, req.headers.token)
      );
    }

    if (req.body.password) { //Need to convert password to has before updating login table
      const hashPassword = sha256("user-login-auth:" + req.body.password)
      
      req.asyncMySQL(
        selectQueries.updatePassword(hashPassword, req.headers.token)
      );
      
    }

    res.send({ status: 1});
  } else {
    res.send({
      status: 0,
      error: "The details you have entered do not match our database.",
    });
  }
});

module.exports = app;
