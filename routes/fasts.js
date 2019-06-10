var express = require('express');
var router = express.Router();

var fastsCtrl = require('../controllers/fasts');

router.get('/new', fastsCtrl.new);
router.post('/', fastsCtrl.create);

module.exports = router;