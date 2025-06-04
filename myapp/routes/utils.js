var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.render('utils'); // Passe-la à la vue si besoin
});

module.exports = { router };