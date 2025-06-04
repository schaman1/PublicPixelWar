var mysql = require('mysql2');

// Database connection & creation
var con = mysql.createConnection({
  host: "yamanote.proxy.rlwy.net",
  port: "30831",
  database: "railway",
  user: "root",
  password: "yMdXBhOeslFOqRfhbbHUWUlijPQZtLlI"
});

con.connect(function(err) {
  if (err) throw err;
  var drop_user = `DROP TABLE IF EXISTS user`;
  con.query(drop_user, function(err, result) {
    if (err) throw err;
    console.log("Table user dropped!");
  });
  console.log("Connected!");
  var user_creation = `CREATE TABLE IF NOT EXISTS user(
    id INT AUTO_INCREMENT,
    googleId VARCHAR(100) NOT NULL,
    users VARCHAR(100) DEFAULT 'nobody',
    power INT DEFAULT 5,
    time VARCHAR(100) DEFAULT 'none',
    popup TEXT,
    nbrColor INT DEFAULT 0,
    admin BOOLEAN DEFAULT FALSE,
    ban BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id)
  )`;
  con.query(user_creation, function(err, result) {
    if (err) throw err;
    console.log("Table user created!");
    showTable("user");
  });

  con.query("SELECT * FROM user", function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});

function showTable(name){
  con.query(`SELECT * FROM ${name}`, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}