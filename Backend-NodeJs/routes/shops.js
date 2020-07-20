var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');


router.post('/', shopController.addShop);

module.exports = router;