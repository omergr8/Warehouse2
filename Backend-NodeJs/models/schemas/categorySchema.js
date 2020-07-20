const mongoose = require("mongoose");
const typesEnum = require('../../helpers/constants_variables').enums.types;

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true
  },
  name: {
    type: String
  },
  parents: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    }
  ],
  warehouse: {
    type: mongoose.Types.ObjectId,
    ref: 'Warehouse'   
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

categorySchema.virtual("type").get(function(){
	return typesEnum[1];
});
module.exports = categorySchema;