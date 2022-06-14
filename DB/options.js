
const path = require('path');
let ecommerce_path = path.join(__dirname, '..', 'DB','ecommerce.sqlite');

const optionsSqlite = {
  client: "sqlite3",
  connection: {
    filename: ecommerce_path
  }
};

const optionsMySQL = {
  host: "localhost",
  user: "root",
  port: "3307",
  password: "root",
  database: "test_db"
};


module.exports = { optionsMySQL, optionsSqlite};