const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.patch("/:email/:password", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.params.email, req.params.password) //included password as a params
  );

  const { count } = results[0];

  if (count) {
    if (req.body.email) {
      req.asyncMySQL(
        selectQueries.updateEmail(req.params.email, req.body.email)
      );
    }

    if (req.body.username) {
      req.asyncMySQL(
        selectQueries.updateUsername(
          req.params.email,
          req.params.password,
          req.body.username
        )
      );
    }

    if (req.body.password) {
      req.asyncMySQL(
        selectQueries.updatePassword(
          req.params.email,
          req.params.password,
          req.body.password
        )
      );
    }

    if (req.body.location) {
      req.asyncMySQL(
        selectQueries.updatePassword(
          req.params.email,
          req.params.password,
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
