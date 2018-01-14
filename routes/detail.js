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
var DBMapping = Bookshelf.Model.extend({
  tableName: 'mapping',
  youCapsule: function() {
    return this.belongsTo(DBCapsule, 'youCapsuleId', 'id');
  },
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
  new DBMapping()
    .where('youCapsuleId', '=', req.params.capsuleId)
    .fetchAll({withRelated: ['youCapsule', 'iCapsule', 'fusion']})
    .then((collection) => {
      var mappings = collection.toArray().map(function(col) {
        console.log(col.attributes);
        console.log(col.related('youCapsule').toJSON());
        console.log(col.related('iCapsule').toJSON());
        console.log(col.related('fusion').toJSON());
        return col.attributes;
      });

      res.render('detail', { 
        title: 'カプセル詳細',
        ultraList: [],
        monsterList: []
      });     

  }).catch((err) =>{
    next(err);
  });
});

module.exports = router;
