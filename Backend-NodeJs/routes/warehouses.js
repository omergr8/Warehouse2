var express = require('express');
var router = express.Router();
const warehouseController = require('../controllers/warehouseController');


router.post('/', warehouseController.addWarehouse);

module.exports = router;