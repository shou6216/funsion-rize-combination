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
    var capsules = collection.toArray().map(function(col) {
      var obj = col.attributes;
      return new ViewCapsule(obj.id, obj.type, obj.fullName, obj.nickName);
    });

    var ultraCapsules = capsules.filter(function (capsule) {
      return capsule.type === 'ultra';
    })

    var monsterCapsules = capsules.filter(function (capsule) {
      return capsule.type === 'monster';
    })

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
