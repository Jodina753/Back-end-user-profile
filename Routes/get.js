const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.get("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.getUser(req.headers.token)
  );

  if (!results[0]) {
    res.send({ status: 0, error: "User does not exist" });
  } else {
    res.send({status: 1, results});
  }
});

module.exports = app;
