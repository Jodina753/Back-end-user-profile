const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.post("/", async (req, res) => {
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.body.email)
  );

  if (results[0].count > 0) {
    res.send({ status: 404, error: "User already exists! Please login." });
  } else {
    const results = await req.asyncMySQL(
      selectQueries.insertUser(
        req.body.email,
        req.body.username,
        req.body.password
      )
    );
    res.send({ status: 200, userId: results.insertId });
  }
});

module.exports = app;
