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
  var drop_user = `DROP TABLE IF EXISTS rules`;
  con.query(drop_user, function(err, result) {
    if (err) throw err;
    console.log("Table user dropped!");
  });
  console.log("Connected!");
  var user_creation = `CREATE TABLE IF NOT EXISTS rules(
    id INT AUTO_INCREMENT,
    timeRaid INT,
    powerBase INT,
    powerRaid INT,
    delayBase INT,
    delayRaid INT,
    gridSize INT,
    PRIMARY KEY(id)
  )`;
  con.query(user_creation, function(err, result) {
    if (err) throw err;
    console.log("Table user created!");
    showTable("rules");
  });

  con.query("SELECT * FROM rules", function(err, result) {
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