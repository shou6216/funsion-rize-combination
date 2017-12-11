var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: '怪獣' });
});

module.exports = router;
