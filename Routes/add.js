const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");
const sha256 = require("sha256");

app.post("/", async (req, res) => {
  
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.body.email)
  );

  if (results[0].count > 0) { 
    res.send({ status: 404, error: "User already exists! Please login." });
  } else {

    const result = await req.asyncMySQL(
      selectQueries.addUserRecord(req.body.email, req.body.username, req.body.password)
    );

    const hashPassword = sha256("user-login-auth:" + req.body.password)

    await req.asyncMySQL(selectQueries.insertUserPassword(result.insertId, hashPassword)) 
    
    res.send({ status: 200, error: "User added."});
  }
});

module.exports = app; 
 