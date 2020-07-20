var express = require('express');
var router = express.Router();
const treeDataController = require('../controllers/treeDataController');

router.get('/warehouses', treeDataController.getWarehouseNames);
router.get('/shops', treeDataController.getShopData);
router.post('/shops', treeDataController.addShopData);
module.exports = router;