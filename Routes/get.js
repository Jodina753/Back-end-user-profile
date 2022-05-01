const express = require("express"); 
const app = express.Router(); 
const selectQueries = require("../mySQL/Queries/index");

app.get("/", async (req, res) => { 
  
  const results = await req.asyncMySQL(
    selectQueries.getUser(req.headers.email, req.headers.password)
  );


  if (results.length === 0 ) {
    res.send({ status: 400, error: "User does not exist" });
  } else {
    res.send(results);
  }
});

module.exports = app;
