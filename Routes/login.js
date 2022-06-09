const express = require("express");
const app = express.Router();
const utils = require("./utils");
const selectQueries = require("../mySQL/Queries/index");
const sha256 = require("sha256");

app.post("/", async (req, res) => {
  const hashPassword = sha256("user-login-auth:" + req.body.password);

  const results = await req.asyncMySQL(
    selectQueries.login(req.body.email, hashPassword)
  );


  if (!results[0]) {
    res.send({
      error:
        "You've entered an incorrect password or email, please check and try again.",
    });
    return;
  }

  const token = utils.getUniqueId();

  req.asyncMySQL(selectQueries.addToken(results[0].id, token));

  res.send({status: 1, token});
});

module.exports = app;
