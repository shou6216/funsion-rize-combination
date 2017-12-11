var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', redirectTop);
router.get('/index', redirectTop);

function redirectTop(req, res, next) {
  res.redirect(301, "/ultra");
}

module.exports = router;
