// config/db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  // socketPath: '/var/run/mysqld/mysqld.sock',
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "tony",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "tuf_db",
  port: process.env.DB_PORT || "3306"
});

module.exports = pool;
