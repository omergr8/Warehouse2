const mongoose = require("mongoose");
const modelResponse = require("../helpers/modelResponse");
const ProductSchema = require("./schemas/ProductSchema");
const Product = mongoose.model("Product", ProductSchema);
const messages = require("../helpers/constants_variables").messages;

Product.save_product = async function (data) {
  try {
    let whProduct = new this(data);
    const saved_whProduct = await whProduct.save();
    return modelResponse.success(saved_whProduct);
  } catch (err) {
    return modelResponse.failure(err);
  }
};

Product.getCategoricalProducts = async function (data) {};
module.exports = Product;
