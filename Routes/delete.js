const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/queries/index");


app.delete("/:email", async (req, res) => {

  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.params.email, req.headers.password)
  );

  const { count } = results[0];

  if (count) {
    req.asyncMySQL(selectQueries.deleteUser(req.params.email, req.headers.password));

    res.send({ status: 200, error: "User has been deleted." });

  } else {

    res.send({ status: 400, error: "User does not exist" });
  }
});

module.exports = app;
