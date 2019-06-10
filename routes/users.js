var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', usersCtrl.show);
router.put('/', usersCtrl.update);
router.delete('/:food', usersCtrl.removeFood);

module.exports = router;
