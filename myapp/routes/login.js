var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

//Cookies pour le nbr de chg qu'un mec peut faire
const {getCookie} = require('../public/javascripts/cookieUtils');

var con = mysql.createPool({
  host: "yamanote.proxy.rlwy.net",
  port: "30831",
  database: "railway",
  user: "root",
  password: "yMdXBhOeslFOqRfhbbHUWUlijPQZtLlI"
});

router.get('/', (req, res) => {
  if (getCookie("id", req) != null){
    const id = getCookie("id", req);
    con.query("SELECT users FROM user WHERE googleId = ?", [id], function(err, result) {
      if (err) throw err;
      if (result.length >0){
        if (result[0].users != null){
          res.cookie("username",result[0].users,{path:'/',maxAge:7*24*60*60*1000});//le cookie reste 2min
          return res.redirect('/');
        }
        else {
          return res.render('login',{info:"Attention, le pseudo est définitif"});
        }
      }
    });
  }
  else {
    return res.redirect('/google');
  }
});

// POST request 
router.post('/', (req, res) => {

  //Verif a faire pour savoir si bon compte
  const pseudo = req.body.pseudo + req.body.CurrentClass;
  const id = getCookie("id", req);

  if (!/^[A-Za-z0-9_-]{1,15}$/.test(req.body.pseudo)) {
      return res.render('login', {info: "Seul les lettres et les chiffres sont autorisés"});//,{Btn : "Seul les lettres et les chiffres sont autorisés"});
  }

  con.query("SELECT users FROM user WHERE users = ?", [pseudo], function(err, result) {
    if (err) throw err;
    if (result.length > 0){
      return res.render('login',{info:"Pseudo déjà utilisé"});//,{Btn : "Pseudo déjà utilisé"});
    }
    else{

    con.query("SELECT googleId,users FROM user WHERE googleId = ?", [id], function(err, re) {
    if (err) throw err;
    if (re.length >0){
      if (re[0].users != null && re[0].users == pseudo){
        res.cookie("username",pseudo,{path:'/',maxAge:7*24*60*60*1000});//le cookie reste 2min
        return res.redirect('/');
      }
      else {
        con.query("INSERT INTO ban (users,motif) VALUES (?,?)",[pseudo,"nous étudions votre cas"],function(e,m) {
          if (e) throw e;
        });
        con.query('UPDATE user SET users=? WHERE googleId = ?', [pseudo,id], function(err,m) {
          if (err) throw err;
          res.cookie("username",pseudo,{path:'/',maxAge:7*24*60*60*1000});//le cookie reste 2min
          return res.redirect('/');
        });
      }
    }    
    });
  }
  });
  //return res.render('login');//,{Btn : "No count found"});
});

module.exports = router;
