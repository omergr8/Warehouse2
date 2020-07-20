const mongoose = require("mongoose");
const modelResponse = require("../helpers/modelResponse");
const productCategorySchema = require("./schemas/productCategorySchema");

productCategorySchema.index({ categroy: 1, warehouse_product: 1 }, { unique: true });
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
const messages = require('../helpers/constants_variables').messages;

ProductCategory.save_product = async function(data) {
	try {
		let ProductCategory = new this({
      category: data.category_id,
			warehouse_product: data.warehouse_product_id
		});
		const saved_product = await ProductCategory.save();
		return modelResponse.success(saved_product);
	} catch (err) {
		return modelResponse.failure(err);
	}
};

ProductCategory.findProducts = async function(data, namesOnly=false) {
	
	let query = {};
	let options = {};
	let total_results = 0;
	let results = null;
	let {page, limit, name, offset, category_id} = data;

	try {
		if (name) {
			query.name = {$regex: new RegExp('^'+ data.name, 'i')};
    }
    if (category_id) {
      query.category = category_id
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
			results
		});
	}
	if (!page) {
		try {
			
			results = await this.find(query, options).populate('warehouse_product','name').exec();
		} catch (err) {
			return modelResponse.failure(err);
		}
	} else {
		// if (page > Math.ceil(total_products / limit)) {
			
		// 	return modelResponse.failure({
		// 		message: messages.invalidPageNo
		// 	});
		// }

		try {
			let to_be_skipped = 0;
			if (offset) {
				to_be_skipped = offset;
			} else {
				to_be_skipped = parseInt( ( page - 1 ) * limit );
			}
			results = await this.find(query, options)
			.skip(to_be_skipped).limit(parseInt(limit)).populate('warehouse_product','title').exec();

		} catch (err) {
			return modelResponse.failure(err);
		}
	}

	return modelResponse.success({
		total_results,
		results
	});
};

module.exports = ProductCategory;