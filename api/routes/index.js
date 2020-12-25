var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const fs = require('fs-extra');
var path = require('path');
var shell = require('shelljs');
var mysql = require("mysql");
const bcrypt = require('bcrypt');

var config = require('../config/config.json');

var db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

router.get('/', function (req, res) {
  let stack = router.stack;
  let routes = [];
  for ( let i = 0; i < stack.length; i++ ) {
    let route = {};
    route.path = stack[i].route.path;
    route.method = stack[i].route.stack[0].method;
    routes.push(route)

  }
  res.send(`<pre>${JSON.stringify(routes, undefined, "    ")}</pre>`);
});

router.get('/generate', function(req, res, next) {
  var username = req.query.name;
  console.log(username);
  var uid = uniqid(`${username}-`);
  console.log(uid);
  var spath = path.join(__dirname, '/../templates/2');
  console.log(spath);
  var dpath = path.join(__dirname, '/../temp', uid);
  console.log(dpath);
  try {
    fs.copySync(spath, dpath)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
  shell.cd('./temp/' + uid);
  shell.exec("git init && git add . && git commit -m 'init'");
  shell.exec('heroku create ' + uid + ' --region eu', function(code, stdout, stderr) {
    shell.exec('git push heroku master', function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      shell.cd('../');
      fs.remove(dpath, err => {
        if (err) return console.error(err)
        console.log('success!')
      })
      res.send({ "shop_uid": uid, "git_url": `https://git.heroku.com/${uid}.git`, "shop_url": `https://${uid}.herokuapp.com` });
    });
  });
});

router.get('/user/:id', function (req, res) {
  var user_id = req.params.id;

});

router.post('/user/:id/edit', function (req, res) {
  var user_id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  db.query("UPDATE user SET name=?, email=? WHERE user_id=?", [name, email, user_id], function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.end()
  });
});

router.post('/user/:id/changepassword', function (req, res) {
  var user_id = req.params.id;
  var password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    db.query('UPDATE user SET password=? WHERE user_id=?', [hash, user_id], function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({type: 'success', message: 'Password changed'})
    });
  })
});

router.get('/user/:id/shops', function (req, res) {
  var user_id = req.params.id;
  db.query("SELECT * FROM shop WHERE user_id=?", user_id, function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send({data: {results}})
  });
});

module.exports = router;
