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
  var drop_user = `DROP TABLE IF EXISTS global`;
  con.query(drop_user, function(err, result) {
    if (err) throw err;
    console.log("Table user dropped!");
  });
  console.log("Connected!");
  var user_creation = `CREATE TABLE IF NOT EXISTS global(
    id INT AUTO_INCREMENT,
    maintenance BOOLEAN DEFAULT FALSE,
    mtnTittle VARCHAR(100) DEFAULT 'Debut :',
    mtnText TEXT,
    PRIMARY KEY(id)
  )`;
  con.query(user_creation, function(err, result) {
    if (err) throw err;
    console.log("Table user created!");
  });

  con.query("SELECT * FROM global", function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  con.query("INSERT INTO global (maintenance, mtnTittle, mtnText) VALUES (TRUE, 'Welcooooome', 'Ce site ouvira ces portes le mercredi 4 Juin à 10h ')", function(err, result) {
    if (err) throw err;
    console.log("Default global settings inserted!");
  });
});

function showTable(name){
  con.query(`SELECT * FROM ${name}`, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}