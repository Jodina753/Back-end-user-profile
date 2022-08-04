const mysql = require("mysql");
const dbConfig = require("../db_config");

const connection = mysql.createConnection(dbConfig);

connection.connect();

function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}

module.exports = asyncMySQL;
