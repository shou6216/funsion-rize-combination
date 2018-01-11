var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('fusion-rize.db');
var Capsule = require('../models/capsule');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.serialize(() => {
    db.all("select * from capsule", (err, rows) => {
      if (!err) {
        var ultraCapsuleList = rows.filter(function (row) {
          return row.type === 'ultra';
        })

        var monsterCapsuleList = rows.filter(function (row) {
          return row.type === 'monster';
        })

        res.render('list', { 
          title: 'カプセル一覧',
          ultraList: ultraCapsuleList,
          monsterList: monsterCapsuleList
        });      
      }
    });
  });
});

module.exports = router;
