var mysql = require('mysql2');

// Database connection & creation
var con = mysql.createConnection({
  host: "yamanote.proxy.rlwy.net",
  port: "30831",
  database: "railway",
  user: "root",
  password: "yMdXBhOeslFOqRfhbbHUWUlijPQZtLlI"
});

popup = "Hello world !";
users = "timTG01"
con.connect(function(err){
    if (err) throw err;
    con.query("UPDATE user SET popup = ? WHERE users = ?",[popup,users], function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});
