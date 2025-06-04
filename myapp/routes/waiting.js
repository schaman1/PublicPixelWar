var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

// Database connection & creation
var con = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: "30831",
  database: "railway",
  user: "root",
  password: "yMdXBhOeslFOqRfhbbHUWUlijPQZtLlI"
});

/* GET home page. */
router.get('/', function(req, res, next) {

    pseudo = req.query.pseudo;

    if (!pseudo || pseudo.trim() === "") {
      return res.redirect('/'); // Redirige si pseudo est absent ou vide
    }
    else {

    admin = false;

    con.query('SELECT admin FROM user WHERE users = ?',[pseudo],(err,r)=>{
      if (err) throw err;
      if (r.length > 0){
        if(r[0].admin){
          return res.redirect('/');
        }
        else{

        con.query('SELECT maintenance, mtnTittle,mtnText FROM global WHERE id = 1', (err, resu) => {
            if (err) throw err;
            if (resu.length > 0 && resu[0].maintenance) {
            return res.render('waiting', { title: resu[0].mtnTittle, text: resu[0].mtnText});
            } 
          else{
            con.query('SELECT ban FROM user WHERE users = ?',[pseudo], (err,u)=>{
              if (err) throw err;
              if (u.length > 0 && u[0].ban) {
                con.query('SELECT afficheBan,motif,time,dureeBan FROM ban WHERE users = ?',[pseudo], (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    if(Date.now()-result[0].time > result[0].dureeBan){
                      return res.redirect('/');
                    }
                    else{
                      const timeRemain = result[0].time>Date.now() ? "Vous êtes banni":`Ban : ${Math.floor((result[0].dureeBan - (Date.now()-result[0].time))/1000)} secondes`;
                      return res.render('waiting', { title: timeRemain, text: result[0].motif});
                    }
                  } 
                  else {
                    return res.redirect('/');
                  }
                });
              }
              else{
                return res.redirect('/');
              }
            });

          }
        });

      }
    }
    else{
      return res.render('waiting', { title: "Petit probleme", text: "Il semble que vous n'avez pas bien terminé de configurer votre compte. Retournez sur la page principale."});
    }
  });
  }
});

module.exports = router;