var express = require('express');
var router = express.Router();
var knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: 'fusion-rize.db'
  },
  useNullAsDefault: true
});
var Bookshelf = require('bookshelf')(knex);
var ViewCapsule = require('../models/capsule');
var DBCapsule = Bookshelf.Model.extend({
  tableName: 'capsule'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  new DBCapsule().fetchAll().then((collection) => {
    var ultraCapsules = [];
    var monsterCapsules = [];
    collection.toArray().forEach(function(col) {
      var json = col.toJSON();
      var viewObj = new ViewCapsule(json.id, json.fullName, json.nickName);
      if (json.type === 'ultra') {
        ultraCapsules.push(viewObj);
      } else {
        monsterCapsules.push(viewObj);
      }
    });

    res.render('list', { 
      title: 'カプセル一覧',
      ultraList: ultraCapsules,
      monsterList: monsterCapsules
    });      

  }).catch((err) =>{
    next(err);
  });
});

module.exports = router;
