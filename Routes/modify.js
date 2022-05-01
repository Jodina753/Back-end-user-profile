const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.patch("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.headers.email, req.headers.password)
  );

  if (results[0].count > 0) {
    if (req.body.email) {
      req.asyncMySQL(
        selectQueries.updateEmail(req.headers.email, req.body.email)
      );
    }

    if (req.body.username) {
      req.asyncMySQL(
        selectQueries.updateUsername(
          req.headers.email,
          req.headers.password,
          req.body.username
        )
      );
    }

    if (req.body.password) {
      req.asyncMySQL(
        selectQueries.updatePassword(
          req.headers.email,
          req.headers.password,
          req.body.password
        )
      );
    }

    if (req.body.location) {
      req.asyncMySQL(
        selectQueries.updatePassword(
          req.headers.email,
          req.headers.password,
          req.body.location
        )
      );
    }

    res.send({ status: 200, error: "User updated!" });
  } else {
    res.send({
      status: 404,
      error: "The details you have entered do not match our database.",
    });
  }
});

module.exports = app;
