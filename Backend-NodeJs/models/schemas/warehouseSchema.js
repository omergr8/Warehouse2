const mongoose = require("mongoose");
const typesEnum = require('../../helpers/constants_variables').enums.types;

const Schema = mongoose.Schema;
const warehouseSchema = new Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		auto: true
	},
	name: {
		type: String
	},
	collections: [
    {
      type: String
    }
  ],
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

warehouseSchema.virtual("type").get(function(){
	return typesEnum[0];
});
module.exports = warehouseSchema;