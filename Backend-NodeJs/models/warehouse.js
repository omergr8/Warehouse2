const mongoose = require("mongoose");
const modelResponse = require("../helpers/modelResponse");
const warehouseSchema = require("./schemas/warehouseSchema");

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
const messages = require('../helpers/constants_variables').messages;

Warehouse.save_warehouse = async function(data) {
	try {
		let warehouse = new this({
      name: data.name,
			collections: data.collections
		});
		const saved_warehouse = await warehouse.save();
		return modelResponse.success(saved_warehouse);
	} catch (err) {
		return modelResponse.failure(err);
	}
};

Warehouse.findWarehouses = async function(data, namesOnly=false) {
	let query = {};
	let options = {};
	let total_results = 0;
	let results = null;
	let {page, limit, name} = data;

	try {
		if (name) {
			query.name = {$regex: new RegExp('^'+ data.name, 'i')};
		}
		if (namesOnly) {
			options.name = 1;
		}
		total_results = await this.countDocuments(query);
	} catch (err) {
		//console.log(err.message);
		return modelResponse.failure(err);
	}

	if (total_results < 1) {
		//return modelResponse.failure({message: messages.NoRecordsFound})
		return modelResponse.success({
			total_results,
			results: []
		});
	}
	if (!page) {
		try {
			
			results = await this.find(query, options).exec();
		} catch (err) {
			return modelResponse.failure(err);
		}
	} else {
		// if (page > Math.ceil(total_results / limit)) {
			
		// 	return modelResponse.failure({
		// 		message: messages.invalidPageNo
		// 	});
		// }

		try {
			let to_be_skipped = parseInt( ( page - 1 ) * limit );
			results = await this.find(query, options)
			.skip(to_be_skipped).limit(parseInt(limit)).exec();
		} catch (err) {
			return modelResponse.failure(err);
		}
	}
	return modelResponse.success({
		total_results,
		results
	});
};

module.exports = Warehouse;