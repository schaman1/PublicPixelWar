var mysql = require('mysql2');


const canvaSize = 200;

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
  var drop_pixels = `DROP TABLE IF EXISTS pixels`;
  con.query(drop_pixels, function(err, result) {
    if (err) throw err;
    console.log("Table pixels dropped!");
  });
  console.log("Connected!"); //Couleur de base blanc à voir si good
  var user_creation = `CREATE TABLE IF NOT EXISTS pixels(
    id INT AUTO_INCREMENT,
    x INT,
    y INT,
    color VARCHAR(25) DEFAULT 'rgb(255, 255, 255)',
    affiche VARCHAR(100) DEFAULT 'blank',
    PRIMARY KEY(id)
  )`;
  con.query(user_creation, function(err, result) {
    if (err) throw err;
    console.log("Table pixels created!");
    createTable();
    showTable("pixels");
  });

  con.query("SELECT * FROM pixels", function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});

function createTable(){

  for (let i = 0; i<canvaSize*canvaSize;i++){

    const x = i%canvaSize;
    const y = Math.floor(i/canvaSize);

    const sql = `INSERT INTO pixels (x, y) VALUES (?, ?)`;
    con.query(sql, [x, y]);
  }
}

function showTable(name){
  con.query(`SELECT * FROM ${name}`, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}