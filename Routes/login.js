const express = require("express");
const app = express.Router();
const utils = require("./utils");
const selectQueries = require("../mySQL/Queries/index");
const sha256 = require("sha256"); 

app.post("/", async (req, res) => {

  //when the password is given at login, will hash it and then check if it matches the one in the database
  const hashPassword = sha256("user-login-auth:" + req.body.password)

  const results = await req.asyncMySQL(
    selectQueries.login(req.body.email, hashPassword)
  );

  if (results.length === 0) {
    res.send({
      status: 404,
      error:
        "You've entered an incorrect password or email, please check and try again.",
    });
    return;
  }

  const token = utils.getUniqueId();

  req.asyncMySQL(selectQueries.addToken(results[0].user_id, token));

  res.status(200).send({ token });
});

module.exports = app;
