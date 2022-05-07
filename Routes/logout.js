const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.delete("/", async (req, res) => {

  req.asyncMySQL(selectQueries.logout(req.headers.token));

  res.send({ status: 200, error: "You have sucessfully logged out" });
});

module.exports = app;
