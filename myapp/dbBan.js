var mysql = require('mysql2');

// Database connection & creation
var con = mysql.createConnection({
  host: "yamanote.proxy.rlwy.net",
  port: "30831",
  database: "railway",
  user: "root",
  password: "yMdXBhOeslFOqRfhbbHUWUlijPQZtLlI"
});

console.log(Date.now());

con.connect(function(err) {
  if (err) throw err;
  var drop_user = `DROP TABLE IF EXISTS ban`;
  con.query(drop_user, function(err, result) {
    if (err) throw err;
    console.log("Table user dropped!");
  });
  console.log("Connected!");
  var user_creation = `CREATE TABLE IF NOT EXISTS ban(
    users VARCHAR(100) ,
    time BIGINT DEFAULT 9999999999999,
    afficheBan TEXT,
    motif TEXT,
    dureeban INT,
    PRIMARY KEY(users)
  )`;
  con.query(user_creation, function(err, result) {
    if (err) throw err;
    console.log("Table user created!");
  });

  con.query("SELECT * FROM ban", function(err, result) {
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

function ban(user,duree,motif){


    const sql = `INSERT INTO ban (users,time,dureeban,motif,afficheBan) VALUES (?,?,?,?,?)
    ON DUPLICATE KEY UPDATE
        time = VALUES(time),
        dureeban = VALUES(dureeban),
        motif = VALUES(motif),
        afficheBan = VALUES(afficheBan)

    `
    con.query(sql,[user,Date.now(),duree,motif,`Ban : ${duree/1000} secondes`], function(err, result) {
        if (err) throw err;
        console.log("Default global settings inserted!");
      });

    con.query("UPDATE user SET ban = TRUE WHERE users = ?",[user], function(err, result) {
        if (err) throw err;
        console.log("UpdateBan");
    });
}

//ban("MerlinTG04",60*60*1000,"Cheh lol ");