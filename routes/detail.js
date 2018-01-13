var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:capsuleId', function(req, res, next) {
  console.log(req.params.capsuleId);
  res.render('detail', { title: '怪獣' });
});

module.exports = router;
