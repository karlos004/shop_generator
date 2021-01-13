var express = require('express');
var router = express.Router();
const db = require('better-sqlite3')('./database.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', function(req, res, next) {
  let sql = db.prepare('SELECT * FROM users');
  const rows = sql.all();

  res.send(rows);
});

router.get('/getProducts', function(req, res, next) {
  let sql = db.prepare('SELECT * FROM products');
  const rows = sql.all();

  res.send(rows);
});

module.exports = router;
