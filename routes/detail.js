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
var ViewFusion = require('../models/fusion');
var DBMapping = Bookshelf.Model.extend({
  tableName: 'mapping',
  iCapsule: function() {
    return this.belongsTo(DBCapsule, 'iCapsuleId', 'id');
  },
  fusion: function() {
    return this.belongsTo(DBFusion, 'fusionId', 'id');
  }
})
var DBCapsule = Bookshelf.Model.extend({
  tableName: 'capsule',
  mapping: function() {
    return this.hasOne(DBMapping);
  }
})
var DBFusion = Bookshelf.Model.extend({
  tableName: 'fusion',
  mapping: function() {
    return this.hasOne(DBMapping);
  }
})

/* GET users listing. */
router.get('/:capsuleId(\\d+)', function(req, res, next) {
  new DBCapsule()
    .where('id', '=', req.params.capsuleId)
    .fetch({require: true})
    .then((col) => {
      var youCapsule = col.toJSON();
      new DBMapping()
        .where('youCapsuleId', '=', youCapsule.id)
        .fetchAll({withRelated: ['iCapsule', 'fusion']})
        .then((collection) => {
          var fusions = collection.toArray().map(function(col) {
            var cps = col.related('iCapsule').toJSON();
            var fsn = col.related('fusion').toJSON();
            return new ViewFusion(cps.id, cps.fullName, fsn.fullName, fsn.phrase);
          });

          res.render('detail', { 
            title: 'カプセル詳細',
            youCapsuleName: youCapsule.fullName,
            fusionList: fusions
          });
        }).catch((err) =>{
          next(err);
        });
    }).catch((err) =>{
      next(err);
    });
});

module.exports = router;
