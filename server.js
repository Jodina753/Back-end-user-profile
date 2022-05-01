const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const asyncMySQL = require("./mySQL/Queries/connection");

//middleware
app.use(cors());
app.use(bodyParser.json());

//access to SQL database
app.use((req, res, next) => {
    req.asyncMySQL = asyncMySQL; 
    next();
  });

  //START SERVER
const port = process.env.PORT || 8002;
app.listen(port, () => console.log(`I am Listening on port ${port}`));


//Routes
//Route 1 - Add user
app.use("/add", require("./routes/add"));
// //Route 2 - Modify user
app.use("/modify", require("./routes/modify"));
// //Route 3 - Delete user
app.use("/delete", require("./routes/delete"));
// //Route 4 - View user
app.use("/get", require("./routes/get"));
