const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "messias",
  password: "faroeste1983",
  database: "doarconecta_db",
});

module.exports = db;
