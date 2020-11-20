var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUser', function(req, res, next) {
  res.send({ 'id': 10 } );
});

module.exports = router;
