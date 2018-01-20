var express = require('express');
var router = express.Router();
var sqliteClient = require('../models/sqliteClient');
var ViewCapsule = require('../models/capsule');

router.get('/', function(req, res, next) {
  new sqliteClient.Capsule().fetchAll().then((collection) => {
    var ultraCapsules = [];
    var monsterCapsules = [];
    collection.toArray().forEach(function(col) {
      var json = col.toJSON();
      var viewObj = new ViewCapsule(json.id, json.nickName, json.productName);
      if (json.type === 'ultra') {
        ultraCapsules.push(viewObj);
      } else {
        monsterCapsules.push(viewObj);
      }
    });

    res.render('list', {
      ultraList: ultraCapsules,
      monsterList: monsterCapsules
    });      

  }).catch((err) =>{
    next(err);
  });
});

module.exports = router;
