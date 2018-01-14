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
  tableName: 'mapping'
})

/* GET users listing. */
router.get('/:capsuleId(\\d+)', function(req, res, next) {
  new DBMapping().where('youCapsuleId', '=', req.params.capsuleId)
    .fetchAll()
    .then((collection) => {
      var mappings = collection.toArray().map(function(col) {
        return col.attributes;
      });
      console.log(mappings);

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
