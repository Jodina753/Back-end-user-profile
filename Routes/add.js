const express = require("express");
const app = express.Router();
const selectQueries = require("../mySQL/Queries/index");

app.post("/", async (req, res) => {
  
  const results = await req.asyncMySQL(
    selectQueries.selectUserCount(req.body.email)
  );

  if (results[0].count > 0) { //ALLOWING THE ADDING OF DUPLICATE RECORDS - THIS SHOULDNT HAPPEN
    res.send({ status: 404, error: "User already exists! Please login." });
  } else {
    const results = await req.asyncMySQL(
      selectQueries.addUserRecord(req.body.email, req.body.username, req.body.password)
    );
    res.send({ status: 200, error: "User added."});
  }
});

module.exports = app; 
