//import the SQL driver
const mysql = require("mysql");

//create a connection to the sql database - using the necessary credentials.
const connection = mysql.createConnection({
  database: "weather_api_database", //database name
  user: "root", //user name
  password: "N0ir_Nyoto", //user password
  host: "localhost", //IP addess
  port: "3306", //usually sql runs on this specific port
});

//connect to the database
connection.connect();

//export so it can be used in different files
module.exports = connection;

//this function will take the query you want to run as a parameter, it will run the query and return the result without us needing to use call-back functions
function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        //if there is an error, reject it with the error itself
        reject(error);
      }

      resolve(results);
    });
  });
}

module.exports = asyncMySQL;