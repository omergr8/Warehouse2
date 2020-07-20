const Warehouse = require("../models/warehouse");
const Category = require("../models/category");
const ProductCategory = require("../models/productCategory");
const responseHandler = require("../helpers/responseHandler");
const messages = require("../helpers/constants_variables").messages;
const mongoose = require('mongoose');
module.exports = {
	/**
	 * @swagger
	 *
	 * /api/trees/warehouses:
	 *   get:
	 *     tags:
	 *       - Trees - Controls
	 *     summary: Get Data for Warehouses tree
	 *     parameters:
	 *       - name: page
	 *         type: integer
	 *         in: query
	 *       - name: limit
	 *         type: integer
	 *         in: query
	 *       - name: parent
	 *         type: string
	 *         in: query
	 *       - name: warehouse
	 *         type: string
	 *         in: query
   * 
	 *     responses:
	 *       200:
	 *         description: Data Sent
	 */
  async getWarehouseNames(req, res, next) {
    let { page, limit, parent, warehouse } = req.query;
		if (!warehouse) {
			const response = await Warehouse.findWarehouses({
				page, 
				limit
			}, namesOnly=true);
	
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
					messages.successfullRetrieval,
					200
				);
			}

		} else {
			if (!parent) {
				parent= warehouse;
			}
			let response = await Category.findCategories({
				page, 
				limit,
				parent,
				warehouse
			}, namesOnly=true);
	
			if (!response.isExecuted) {
				return responseHandler.failure(
					res,
					response.err,
					response.err.message,
					500
				);
			}
			var response_data = JSON.parse(JSON.stringify(response.data));
			total_returned_categories = response_data.results.length;
			if ((response.data && limit && total_returned_categories >= limit) || !parent) {
				return responseHandler.success(
					res,
					response.data,
					messages.successfullRetrieval,
					200
				);
	
			} else {
				total_results = response.data.total_results;
				offset = 0;
				page = 0;
				if (page && limit) {
					page_1 = Math.ceil(total_results/limit);
	
					if (page == page_1) {
						page = 1;
						limit = page * limit - total_results;
					} else{
						 offset = page_1 * limit - total_results;
						 page = 1;
					}
				}
				
				response = await ProductCategory.findProducts({
					page: 1, 
					limit,
					offset,
					category_id : parent
				}, namesOnly=true);
		
				if (!response.isExecuted) {
					return responseHandler.failure(
						res,
						response.err,
						response.err.message,
						500
					);
				}
				
				total_results = response_data.total_results + response.data.total_results;
				results = Object.assign(response_data.results, response.data.results);
	
	
				return responseHandler.success(
					res,
					{
						total_results,
						results
					},
					messages.successfullRetrieval,
					200
				);
			}
		}
	},

	/**
	 * @swagger
	 *
	 * /api/trees/shops:
	 *   get:
	 *     tags:
	 *       - Trees - Controls
	 *     summary: Get Data for Shops tree
	 *     parameters:
	 *       - name: parent
	 *         type: string
	 *         in: query
	 *       - name: limit
	 *         type: integer
	 *         in: query
	 *       - name: page
	 *         type: integer
	 *         in: query
   * 
	 *     responses:
	 *       200:
	 *         description: Data Sent
	 */

	async getShopData(req, res, next) {

		let { page, limit, parent} = req.query;

		if (!parent) {
			warehouse =null
		} else {
			warehouse = 1;
		}
		let response = await Category.findCategories({
			page, 
			limit,
			parent,
			warehouse
		}, namesOnly=true);

		if (!response.isExecuted) {
			return responseHandler.failure(
				res,
				response.err,
				response.err.message,
				500
			);
		}
		var response_data = JSON.parse(JSON.stringify(response.data));
		total_returned_categories = response_data.results.length;
		if ((response.data && limit && total_returned_categories >= limit) || !parent) {
			return responseHandler.success(
				res,
				response.data,
				messages.successfullRetrieval,
				200
			);

		} else {
			total_results = response.data.total_results;
			offset = 0;
			page = 0;
			if (page && limit) {
				page_1 = Math.ceil(total_results/limit);

				if (page == page_1) {
					page = 1;
					limit = page * limit - total_results;
				} else{
					 offset = page_1 * limit - total_results;
					 page = 1;
				}
			}
			
			response = await ProductCategory.findProducts({
				page: 1, 
				limit,
				offset,
				category_id : parent
			}, namesOnly=true);
	
			if (!response.isExecuted) {
				return responseHandler.failure(
					res,
					response.err,
					response.err.message,
					500
				);
			}
			
			total_results = response_data.total_results + response.data.total_results;
			results = Object.assign(response_data.results, response.data.results);


			return responseHandler.success(
				res,
				{
					total_results,
					results
				},
				messages.successfullRetrieval,
				200
			);
		}
	},

/**
 * @swagger
 *
 * /api/shops:
 *   post:
 *     tags:
 *       - Trees - Controls
 *     summary: Add A New Node in Tree
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               selected_nodes:
 *                 type: array
 *                 items:
 *                   type: object
 * 
 *     responses:
 *       200:
 *         description: successful Result

*/
	async addShopData(req, res, next) {
		let selected_nodes = [];
		console.log(req.body.selected_nodes)
		try {
			selected_nodes = JSON.parse(JSON.stringify(req.body.selected_nodes));
		} catch(err) {
			return responseHandler.failure(
				res,
				err,
				err.message,
				500
			);
		}
			try {
				let response = null;
			for (node of selected_nodes) {
				if(node.type == 'product') {
					if(node.parent) {
						console.log('a');
						response = await ProductCategory.save_product({
							category_id: mongoose.Types.ObjectId(node.parent.key),
							warehouse_product_id: mongoose.Types.ObjectId(node.key)
						});
						if (!response.isExecuted) {
							
							throw new Error(response.err.message);
						}
					} 
					// else {
					// 	response = await Category.save_category({
					// 		name: String('Super ' + node.header),
					// 		parent_id: null
					// 	});
					// 	if (!response.isExecuted) {
					// 		throw new Error(response.err.message);
					// 	} 
					// 	let dat = response.data;
					// 	response = await ProductCategory.save_product({
					// 		category_id: dat._id,
					// 		warehouse_product_id: node.key
					// 	});
					// 	if (!response.isExecuted) {
					// 		throw new Error(response.err.message);
					// 	}
					// }
				}

				if (node.type == 'category') {
					if(node.parent) {
						response = await Category.find_one({
							_id: node.key
						});
						if (!response.isExecuted) {
							throw new Error(response.err.message);
						}
						if (!response.data.parents.includes(node.parent.key)) { 
							let categ = response.data;
							categ.parents.push(node.parent.key);
							response = await Category.save_retrieved(categ);
							if (!response.isExecuted) {
								throw new Error(response.err.message);
							}
						}

					}
				}

				if (node.type =='warehouse') {
					if (node.parent) {
						response = await Category.update_many({
							warehouse_id: mongoose.Types.ObjectId(node.key),
							parent_id: mongoose.Types.ObjectId(node.parent.key)
						});
						if (!response.isExecuted) {
							throw new Error(response.err.message);
						}
					}
				}
			}
			} catch(err) {
				console.log(err)
				return responseHandler.failure(
					res,
					err,
					err.message,
					500
				);
			}
			return responseHandler.success(
				res,
				null,
				messages.successfullRetrieval,
				200
			);
		} 
};