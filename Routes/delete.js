const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/queries/index");

app.delete("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.headers.email)
  );

  if (results[0].count === 0) {
    req.asyncMySQL(selectQueries.deleteUser(req.headers.token));

    res.send({ status: 1 });
  } else {
    res.send({ status: 0, error: "User does not exist" });
  }
});

module.exports = app;
