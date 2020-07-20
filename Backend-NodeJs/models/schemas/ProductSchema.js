const mongoose = require("mongoose");
const typesEnum = require('../../helpers/constants_variables').enums.types;
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		auto: true
	},
	product_code: {
		type: Number
	},
	name: {
		type: String
  },
  title: {
    type: String
  },
  active: {
    type: Number
  },
  unit: {
    type: String
  },
  package: {
    type: String
  },
  category: {
    type: String
  },
  barcode: {
    type: String
  },
  producer: {
    type: String
  },
  unit: {
    type: String
  },
  short_description: {
    type: String
  },
  stock: {
    type: Number
  },
  images: [
    {
    type: String
    }
  ],
  group: {
    type: String
  },
  subgroup: {
    type: String
  },
  vat: {
    type: Number
  },
  promo: {
    type: String
  },
  color: {
    type: String
  },
  name_1: {
    type: String
  },
  name_2: {
    type: String
  },
  cluster: {
    type: String
  },
  size: {
    type: String
  },
  price: {
    type: Number
  },
  warehouse: {
    type: mongoose.Types.ObjectId,
    ref: "Warehouse"
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

ProductSchema.virtual("type").get(function(){
	return typesEnum[2];
});
module.exports = ProductSchema;