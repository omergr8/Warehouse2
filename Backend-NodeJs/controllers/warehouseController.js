const Warehouse = require("../models/warehouse");
const responseHandler = require("../helpers/responseHandler");
const messages = require("../helpers/constants_variables").messages;
module.exports = {

/**
 * @swagger
 *
 * /api/warehouses:
 *   post:
 *     tags:
 *       - Warehouses - Controls
 *     summary: Add a new Warehouse
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               collections:
 *                 type: array
 *                 items:
 *                   type: string
 * 
 *     responses:
 *       200:
 *         description: successful Result

*/
  async addWarehouse(req, res, next) {
    let { 
          name, 
          collections
        } = req.body;
    
    let data = {};
    data.name = name;
    data.collections = collections;

    const response = await Warehouse.save_warehouse(data);

    if (!response.isExecuted) {
      return responseHandler.failure(
        res,
        response.err,
        response.err.message,
        500
      );
    } else {
      return responseHandler.success(
        res,
        response.data,
        messages.SuccessfulSave,
        200
      );
    }
  },
};