var mysql = require("mysql2");


var pool = mysql.createPool({
  host: "localhost",
  user: "nishika",
  password: "hello",
  port: 3306,
  database: "crud",
  connectionLimit: 9000,
});




module.exports = pool;
