var express = require('express');
var router = express.Router();
var sqliteClient = require('../models/sqliteClient');
var ViewFusion = require('../models/fusion');

router.get('/:capsuleId(\\d+)', function(req, res, next) {
  new sqliteClient.Capsule()
    .where('id', '=', req.params.capsuleId)
    .fetch({require: true})
    .then((col) => {
      var youCapsule = col.toJSON();
      new sqliteClient.Mapping()
        .where('youCapsuleId', '=', youCapsule.id)
        .fetchAll({withRelated: ['iCapsule', 'fusion']})
        .then((collection) => {
          var fusions = collection.toArray().map(function(col) {
            var cps = col.related('iCapsule').toJSON();
            var fsn = col.related('fusion').toJSON();
            return new ViewFusion(cps.id, cps.nickName, fsn.fullName, fsn.phrase);
          });

          res.render('detail', { 
            youCapsuleName: youCapsule.nickName,
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
