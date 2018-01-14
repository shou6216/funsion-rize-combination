var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:capsuleId(\\d+)', function(req, res, next) {
  console.log(req.params.capsuleId);
  res.render('detail', { 
    title: 'カプセル詳細',
    ultraList: [],
    monsterList: []
  }); 
});

module.exports = router;
