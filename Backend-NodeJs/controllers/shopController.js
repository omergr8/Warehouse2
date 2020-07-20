const Shop = require("../models/category");
const responseHandler = require("../helpers/responseHandler");
const messages = require("../helpers/constants_variables").messages;
const mongoose = require("mongoose");
module.exports = {

/**
 * @swagger
 *
 * /api/shops:
 *   post:
 *     tags:
 *       - Shops - Controls
 *     summary: Add a new Shop
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: successful Result

*/
  async addShop(req, res, next) {
    let { 
          name
        } = req.body;
    
    let data = {};
    data.name = name;
    // data.parent_id = mongoose.Types.ObjectId(req.body.parent);
    // data.warehouse = mongoose.Types.ObjectId(req.body.warehouse);
    const response = await Shop.save_category(data);

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