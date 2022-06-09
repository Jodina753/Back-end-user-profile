const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const asyncMySQL = require("./mySQL/Queries/connection");
const selectQueries = require("./mySQL/Queries/index");
const utils = require("./Routes/utils");

//middleware
app.use(cors());
app.use(bodyParser.json());

//store data as files to local storage
app.use((req, res, next) => {
  utils.addToLog(req.headers);
  next();
});

//access to SQL database
app.use((req, res, next) => {
  req.asyncMySQL = asyncMySQL;
  next();
});

//START SERVER
const port = process.env.PORT || 8002;
app.listen(port, () => console.log(`I am Listening on port ${port}`));

//authenticate
async function authenticate(req, res, next) {

  const results = await req.asyncMySQL(
    selectQueries.getUserIdFromToken(req.headers.token)
  );

  if (!results[0]) {
    res.send({ status: 0, error: "try again" });
  } else {
    next();
  }
}

//Route 1 - Add user
app.use("/add", require("./routes/add"));
//Route 2 - Modify user
app.use("/modify", authenticate, require("./routes/modify"));
//Route 3 - Delete user
app.use("/delete", authenticate, require("./routes/delete"));
//Route 4 - View user
app.use("/get", authenticate, require("./routes/get"));
//Route 5 - Login
app.use("/login", require("./routes/login"));
//Route 6 - Logout
app.use("/logout", require("./routes/logout"));
