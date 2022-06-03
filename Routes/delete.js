const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/queries/index");

app.delete("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.headers.email)
  );

  if (results[0].count === 0) {
    req.asyncMySQL(selectQueries.deleteUser(req.headers.token));

    res.send({ status: 200, error: "User has been deleted." });
  } else {
    res.send({ status: 400, error: "User does not exist" });
  }
});

module.exports = app;
