const express = require("express"); 
const app = express.Router(); 
const selectQueries = require("../mySQL/Queries/index");

app.get("/:email", async (req, res) => { //chnage so that it brings them to a login page?
  console.log(selectQueries.getUser(req.params.email, req.headers.password))
  const results = await req.asyncMySQL(
    selectQueries.getUser(req.params.email, req.headers.password)
  );


  if (results.length === 0 ) {
    res.send({ status: 400, error: "User does not exist" });
  } else {
    res.send(results);
  }
});

module.exports = app;
