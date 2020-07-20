const mongoose = require("mongoose");
const typesEnum = require('../../helpers/constants_variables').enums.types;

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({

  _id: {
    type: mongoose.Types.ObjectId,
    auto: true
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },

  warehouse_product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },

  added_on: {
		type: Date,
		default: Date.now
	}
},
{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
	},
	id: false
});
productCategorySchema.virtual("type").get(function(){
	return typesEnum[3];
});
module.exports = productCategorySchema