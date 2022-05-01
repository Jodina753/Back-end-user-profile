const express = require("express");
const app = express.Router();
const utils = require("./utils.js");
const selectQueries = require("../mySQL/queries/index");

app.post("/", async (req, res) => {
    
    const results = await req.asyncMySQL(
      selectQueries.login(req.body.email, req.body.password)
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
  
    req.asyncMySQL(selectQueries.addToken(results[0].id, token));
    
    res.status(200).send({ token });
  });
  
  module.exports = app;