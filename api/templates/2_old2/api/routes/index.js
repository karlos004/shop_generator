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

router.get('/getCategories', function(req, res, next) {
  let sql = db.prepare('SELECT * FROM category');
  const rows = sql.all();

  res.send(rows);
});

router.post('/editProduct/:id', function(req, res, next) {
  var id = req.params.id;
  var data = req.body.data
  console.log(data);
  const stmt = db.prepare('UPDATE products SET price = ?, description = ?, image = ?,  status = ? WHERE product_id = ?');
  const info = stmt.run(data.price, data.description, data.picture, data.status, id);

  res.end();
});

router.post('/addProduct', function(req, res, next) {
  var data = req.body.data
  console.log(data);
  const stmt = db.prepare('INSERT INTO products (price, description, image,  status) VALUES (?, ?, ?, ?)');
  const info = stmt.run(data.price, data.description, data.picture, data.status);

  res.end();
});

module.exports = router;
