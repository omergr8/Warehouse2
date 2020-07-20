const mongoose = require("mongoose");
const modelResponse = require("../helpers/modelResponse");
const categorySchema = require("./schemas/categorySchema");

const Category = mongoose.model("Category", categorySchema);
const messages = require('../helpers/constants_variables').messages;


Category.update_many = async function(data) {
	try {
		const retrieved_category = await this.updateMany({warehouse: data.warehouse_id}, {$push: {parents:data.parent_id}}).exec();
		return modelResponse.success(retrieved_category);
	} catch (err) {
		return modelResponse.failure(err);
	}	
}
Category.save_retrieved = async function(data) {
	try {
		const retrieved_category = await data.save();
		return modelResponse.success(retrieved_category);
	} catch (err) {
		return modelResponse.failure(err);
	}	
}
Category.find_one = async function(data) {
	try {


		const retrieved_category = await this.findOne(
			data
		).exec();
		console.log(retrieved_category)
		return modelResponse.success(retrieved_category);
	} catch (err) {
		return modelResponse.failure(err);
	}
}
Category.save_category = async function(data) {
	try {
		if (data.parent_id) {
			let category = new this({
				name: data.name,
				parents: [data.parent_id],
				// warehouse: data.warehouse
			});
		} else {
			let category = new this({
				name: data.name,
				parents: [data.parent_id],
				// warehouse: data.warehouse
			});
		}

		const saved_category = await category.save();
		return modelResponse.success(saved_category);
	} catch (err) {
		return modelResponse.failure(err);
	}
};

Category.findCategories = async function(data, namesOnly=false) {
	let query = {};
	let options = {};
	let total_results = 0;
	let results = null;
	let {page, limit, name, parent, warehouse} = data;

	query.parents = [];
	try {
		if (name) {
			query.name = {$regex: new RegExp('^'+ data.name, 'i')};
    }
    if (parent) {
      query.parents = parent;
		}
		if (warehouse != 1) {
			query.warehouse = warehouse;
		}
		if (namesOnly) {
			options.name = 1;
			options.parents = 1;
			options.warehouse =1;
		}
		total_results = await this.countDocuments(query);
	} catch (err) {
		//console.log(err.message);
		return modelResponse.failure(err);
	}

	if(total_results < 1) {
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

module.exports = Category;