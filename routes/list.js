var express = require('express');
var router = express.Router();

var ultraList = [
  {
    id : "U100",
    fullName: "ウルトラマンジード",
    shortName: "ジード",
    stage: 1
  },
  {
    id : "U101",
    fullName: "ウルトラマンオーブ",
    shortName: "オーブ",
    stage: 2
  },
  {
    id : "U102",
    fullName: "ウルトラマンエックス",
    shortName: "エックス",
    stage: 3
  }
]

var monsterList = [
  {
    id : "M100",
    fullName: "ゴモラ",
    shortName: "ゴモラ",
    stage: 10
  },
  {
    id : "M101",
    fullName: "ゼットン",
    shortName: "ゼットン",
    stage: 20
  },
  {
    id : "M102",
    fullName: "バードン",
    shortName: "バードン",
    stage: 30
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { 
    title: 'カプセル一覧',
    ultraList: ultraList,
    monsterList: monsterList
  });
});

module.exports = router;
