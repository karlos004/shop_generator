var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var config = require('../config/config.json');

var db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});


router.get('/', (req, res) => {
  let stack = router.stack;
  let routes = [];
  for ( let i = 0; i < stack.length; i++ ) {
    let route = {};
    route.path = stack[i].route.path;
    route.method = stack[i].route.stack[0].method;
    routes.push(route)

  }
  res.send(`<pre>${JSON.stringify(routes, undefined, "    ")}</pre>`);
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) return res.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
  db.query('select * from `user` where `email`=?', email, (error, results) => {
    if (error) return res.status(500).json({type: 'error', message: 'db error', error})
    if (results.length == 0) return res.status(403).json({type: 'error', message: 'User with provided email not found in database.'})
    const user = results[0]
    console.log(user);
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) return res.status(500).json({type: 'error', message: 'bcrypt error', error})
      if (result) {
        console.log(jwt.sign({id: user.user_id, email: user.email}, config.jwt.token, {expiresIn: '7d'}))
        res.json({
          type: 'success',
          message: 'User logged in.',
          user: {id: user.user_id, name: user.name, email: user.email},
          token: jwt.sign({id: user.user_id, email: user.email, name: user.name}, config.jwt.token, {expiresIn: '7d'})
        })
      } else return res.status(403).json({type: 'error', message: 'Password is incorrect.'})
    })
  })
})

router.get('/me', (req, res) => {
  console.log(req.headers);
  const token = req.headers['authorization']
  if (!token) return res.status(400).json({type: 'error', message: 'authorization header not found.'})
  jwt.verify(token, config.jwt.token, (error, result) => {
    if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
    db.query('select * from `user` where `user_id`=?', result.id, (error, results) => {
      return res.json({
        type: 'success',
        message: 'Provided token is valid.',
        user: results[0]
      })
    });
  })
})

router.post('/register', (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  db.query('select * from `user` where `email`=?', email, (error, results) => {
    console.log(results)
    if (results.length === 0){
      bcrypt.hash(password, 10, function(err, hash) {
        db.query('INSERT INTO user (name, email, password) values (?, ?, ?)', [username, email, hash], function (error, results, fields) {
          if (error) throw error;
          res.status(200).json({type: 'success', message: 'user created'})
        });
      })
    }else{
      res.status(400).json({type: 'error', message: 'user with that email is already registered'})
    }
  })
})

module.exports = router;
