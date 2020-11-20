var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const fs = require('fs-extra');
var path = require('path');
var shell = require('shelljs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate', function(req, res, next) {
  var uid = uniqid('name-');
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
    });
  });


  res.send({ "message": uid });
});

module.exports = router;
