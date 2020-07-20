const mongoose = require("mongoose");
const typesEnum = require('../../helpers/constants_variables').enums.types;

const Schema = mongoose.Schema;

const whCategorySchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true
  },
  name: {
    type: String
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'WarehouseCategory'
  },
  warehouse: {
    type: mongoose.Types.ObjectId
  },
  added_on: {
		type: Date,
		default: Date.now
	}
});

module.exports = whCategorySchema;